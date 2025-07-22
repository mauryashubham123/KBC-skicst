import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { useState } from "react"

interface SearchDialogInterface extends React.ComponentPropsWithoutRef<typeof Input> {
    onValueChange?:(e:any)=>void
    onSearch?:(e:string)=>void
    children?:React.ReactNode
}

export const SearchDialog:React.FC<SearchDialogInterface> = ({onValueChange=()=>null,onSearch=()=>null,className,children,...props}) => {
    const [open,setOpen] = useState(false);
    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            onSearch(e.currentTarget.value);
            setOpen(false);
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ?? <Button variant={'secondary'} size={'icon'}><Search className="size-4" /></Button>}
            </DialogTrigger>
            <DialogContent className="p-0 [&>button]:hidden top-1/4 px-2 bg-transparent border-none outline-none [&>input]:pl-8">
                <Search className="left-4 absolute top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input type="search"  className={cn('outline-none border-none my-1 py-2',className)} onChange={onValueChange} {...props} onKeyDown={handleKeyDown} />
            </DialogContent>
        </Dialog>
    )
}