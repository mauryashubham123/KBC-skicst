
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { UserType } from "@/types/user";
import React from "react";
import { Loader2, Trash2 } from "lucide-react";

interface DeleteStudentAlertProps extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
    student:UserType,
    isLoading?:boolean,
    handleDelete?:()=>void
}

const DeleteStudentAlert:React.FC<DeleteStudentAlertProps> = ({student,handleDelete=()=>null,isLoading=false,...props}) => {
    const [confirm,setConfirm] = React.useState('');
    return (
         <AlertDialog {...props}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-destructive flex items-center"><Trash2 className="inline size-6 me-2" />Are you sure you want to delete?</AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground py-4">
                        This action cannot be undone. This will permanently delete student : <br />
                        <span className="font-medium text-destructive capitalize underline">{" "} { student.name}</span>  and all related data <b>(dues, attendance, enrollment, batch assignment etc.)</b> from our servers.
                        <p className="text-sm text-primary mt-2" >Type <span className="font-bold text-amber-700">DELETE STUDENT</span> in the input box to confirm.</p>    
                    </AlertDialogDescription>
                    <Input value={confirm} onChange={(e)=>setConfirm(e.target.value)} placeholder="Type DELETE STUDENT to confirm" />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={isLoading || confirm !== 'DELETE STUDENT'} onClick={() => handleDelete()}>
                        {isLoading && <Loader2 className="animate-spin inline size-4" />}
                        {isLoading && 'Deleting...' || 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
export default DeleteStudentAlert;