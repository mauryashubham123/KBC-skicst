
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { role_apis } from "@/lib/helpers/api_urls";
import { RoleType } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const DeleteRoleDialog:React.FC<{role:RoleType,children?:React.ReactNode}> = ({role,children}) => {
    const [open,setOpen] = React.useState(false);
    const queryClient = useQueryClient();
    const roleDeleteMutation = useMutation({
        mutationFn:() => role_apis.trash(role.id),
        onSuccess: (res) => {
            toast.success(res.message);
            setOpen(false);
            queryClient.invalidateQueries({queryKey:['roles'],exact:false});
        },
        onError: (e:any) => toast.error(e?.response?.data?.message ?? e.message)
    })
    return (
        <AlertDialog open={open || roleDeleteMutation.isPending} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {children ?? 
                    <Button variant={'destructive'} className="flex gap-2">
                        <Trash2 className="size-4 inline" />
                        <span className="hidden md:inline">Delete Role</span>
                    </Button>
                }
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-destructive flex items-center"><Trash2 className="inline size-6 me-2" />Are you sure you want to delete?</AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground py-4">
                        This action cannot be undone. This will permanently delete <span className="font-medium text-destructive">{role.name}</span> from our servers.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction disabled={roleDeleteMutation.isPending} onClick={() => roleDeleteMutation.mutate()}>
                            {roleDeleteMutation.isPending && <Loader2 className="animate-spin inline size-4" />}
                            {roleDeleteMutation.isPending && 'Deleting...' || 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default DeleteRoleDialog