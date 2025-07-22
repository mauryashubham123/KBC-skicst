import * as React from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { useQuery } from "@tanstack/react-query"
import { user_apis } from "@/lib/helpers/api_urls"
import { UserType } from "@/types/user"
import { useDebounce } from "@/hooks/use-debounce"
import { Separator } from "../ui/separator"
import { Search, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { AssetUrl } from "@/lib/helpers/api_helper"
import { Badge } from "../ui/badge"

export function CommandDialogDemo() {
    const [open, setOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [initialDataLoaded, setInitialDataLoaded] = React.useState(false);
    
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, []);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    
    // Reset search when dialog closes
    React.useEffect(() => {
        if (!open) {
            setSearchQuery('');
        } else if (!initialDataLoaded) {
            // Load initial data when modal opens for the first time
            setInitialDataLoaded(true);
        }
    }, [open, initialDataLoaded]);

    // Format the search query param
    const queryParam = React.useMemo(() => {
        return debouncedSearchQuery ? `?&search_query=${encodeURI(debouncedSearchQuery)}` : '';
    }, [debouncedSearchQuery]);

    

    const userListQuery = useQuery<any, any, UserType[]>({
        queryKey: ["users-global"],
        queryFn: () => user_apis.list(''),
        select: (res) => res.data.users,
        staleTime: 5 * 60 * 60 * 100,
        gcTime: 5 * 60 * 60 * 100,
        enabled: initialDataLoaded
    });




    const searchUsersQuery = useQuery<any, any, UserType[]>({
        queryKey: ["users-search", queryParam],
        queryFn: () => user_apis.list(''),
        select: (res) => res.data.users,
        enabled: !!queryParam && initialDataLoaded,
    });


    // Determine which data to display based on search status
    const displayUsers = React.useMemo(() => {
        if (debouncedSearchQuery && searchUsersQuery.data) {
            return searchUsersQuery.data;
        }
        return userListQuery.data || [];
    }, [debouncedSearchQuery, userListQuery.data, searchUsersQuery.data]);
    
    
    
   

    // Check if any search is in progress
    const isSearching = searchUsersQuery.isLoading;
    // Check if we have no results across all categories
    const hasNoResults = debouncedSearchQuery && !isSearching && displayUsers.length === 0;
    
    const navigate = useNavigate();
    const handleNavigateToProfile = (id:string|number) => navigate(`/users/profile/${id}`)
    const handleUserSelect = (id:string|number) => {
        handleNavigateToProfile(id);
        setOpen(false);
    }

    return (
        <CommandDialog open={open} onOpenChange={setOpen} >
            <div className="flex gap-2 items-center px-3">
                <Search className="size-5 text-muted-foreground" />
                <input 
                    className="p-2 rounded-lg outline-none m-1 w-full bg-background"
                    value={searchQuery}
                    onChange={(e)=>setSearchQuery(e.target.value)} 
                    placeholder="Type a command or search..." 
                />
            </div>
            <Separator />
            <CommandList>
                {isSearching && (<CommandEmpty>Searching...</CommandEmpty>)}
                {hasNoResults && (<CommandEmpty>No results found.</CommandEmpty>)}
                {displayUsers.length > 0 && (
                    <CommandGroup heading={
                        <div className="flex items-center gap-2 text-emerald-600">
                            <Users className="size-5" />
                            <span className="text-sm">Users</span>
                        </div>
                    }>
                        {displayUsers.map((u: UserType) => (
                            <CommandItem key={u.id} onSelect={(_e) =>handleUserSelect(u.id)}>
                                <div className="flex gap-2 justify-between items-center w-full">
                                    <div className="flex gap-2 items-center">
                                        <Avatar className="h-6 w-6 border border-gray-600">
                                            <AvatarImage src={AssetUrl + u.avatar} alt={u.name} />
                                            <AvatarFallback className="text-xs">{u.name.charAt(0)}</AvatarFallback>
                                        </Avatar>   
                                        <span className="font-bold">{u.name}</span>
                                    </div>
                                    <Badge variant={'outline'} className={`${u.role.type === 'admin'?'text-destructive':''} w-fit text-xs`}>{u.role.name}</Badge>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
            </CommandList>
        </CommandDialog>
    )
}