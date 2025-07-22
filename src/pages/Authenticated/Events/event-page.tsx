import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/Features/uiSlice";
import { useQuery } from "@tanstack/react-query";
import { KbcEventType } from "@/types/user";
import { kbc } from "@/lib/helpers/api_urls";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableEmptyState } from "@/components/Custom/table-empty-state";
import { SearchDialog } from "@/components/Custom/search-dialog";
import EventCard from "./Components/event-card";
import CreateEventDialog from "./Components/create-event-dialog";

type EventQueryResponseType = {
    events: KbcEventType[];
}

const EventPage = () => {
    const dispatch = useAppDispatch();
    
    const [searchText, setSearchText] = useState(() => {
        const config = localStorage.getItem('eventpageconfig');
        return config ? JSON.parse(config).searchText : '';
    });
    
    useEffect(() => {
        localStorage.setItem('eventpageconfig', JSON.stringify({
            searchText
        }));
    }, [searchText]);
    
    // Build query parameters
    const buildQueryParams = () => {
        const params = new URLSearchParams();
        if (searchText) params.append('search', searchText);
        return params.toString();
    };

    const eventListQuery = useQuery<any, any, EventQueryResponseType>({
        queryKey: ['events', searchText],
        queryFn: () => kbc.event_apis.getEventList(buildQueryParams()),
        select: (res) => res.data,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });

    useEffect(() => {
        dispatch(setBreadcrumb([
            { label: 'Dashboard', link: '/dashboard' },
            { label: 'Event Management', type: 'page' }
        ]));
    }, []);

    return (
        <div className="container px-4 sm:px-8">
            <div className="my-3 grid gap-2">
                <h1 className="text-2xl md:text-2xl font-bold">Event Management</h1>
                <p className="text-muted-foreground text-xs md:text-sm">
                    Manage KBC events, set questions, control event status and timing. Create new events or manage existing ones.
                </p>
            </div>

            {/* Actions Section */}
            <div className="flex flex-wrap gap-2 justify-between md:items-center items-end mt-6">
                <div className="flex gap-2">
                    <Button
                        onClick={() => eventListQuery.refetch()}
                        variant="secondary"
                        size="icon"
                    >
                        <RefreshCwIcon className={cn("size-4", eventListQuery.isLoading || eventListQuery.isRefetching ? 'animate-spin' : '')} />
                    </Button>
                </div>
                
                <div className="flex gap-2">
                    <SearchDialog
                        onSearch={setSearchText}
                        defaultValue={searchText}
                        placeholder="Search events..."
                    />
                    <CreateEventDialog />
                </div>
            </div>

            {/* Loading State */}
            {eventListQuery.isLoading && <EventPageSkeleton />}
            
            {/* Empty State */}
            {eventListQuery.data && eventListQuery.data.events.length < 1 && <TableEmptyState />}
            
            {/* Events List */}
            {eventListQuery.data && eventListQuery.data.events.length > 0 && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
                    {eventListQuery.data.events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventPage;

const EventPageSkeleton = () => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
            {Array.from([1, 2, 3, 4, 5, 6]).map((i) => (
                <Card key={i}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div className="grid gap-2 flex-1">
                                <Skeleton className="w-48 h-6" />
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-3/4 h-4" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Skeleton className="w-20 h-6 rounded-full" />
                                <Skeleton className="w-16 h-5" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3">
                            <div className="flex gap-2">
                                <Skeleton className="w-24 h-5" />
                                <Skeleton className="w-28 h-5" />
                            </div>
                            <Skeleton className="w-full h-16 rounded" />
                            <div className="flex gap-2">
                                <Skeleton className="w-20 h-8" />
                                <Skeleton className="w-24 h-8" />
                                <Skeleton className="w-16 h-8" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};