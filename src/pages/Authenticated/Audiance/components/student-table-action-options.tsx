import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {   MoreHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { UserType } from "@/types/user"
import { user_apis } from "@/lib/helpers/api_urls"
// import { useNavigate } from "react-router-dom"
import DeleteStudentAlert from "./delete-student-dialog-content"

const StudentTableActionOptions: React.FC<{student:UserType}> = ({student}) => {
    // const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [open,setOpen] = useState(false);

    const [deleteDialogOpen,setDeleteDialogOpen] = useState(false);


    // delete mutation
    const studentDeleteMutation = useMutation({
        mutationFn:()=>user_apis.trash(student.id),
        onSuccess: res=> {
            toast.success(res.message);
            setDeleteDialogOpen(false);
            queryClient.invalidateQueries({queryKey:['users'],exact:false});
            queryClient.invalidateQueries({queryKey:['students'],exact:false});
        },
        onError : (e:any) => toast.error(e?.response?.data?.message ?? e.message)
     });
     const handleDelete = () => studentDeleteMutation.mutate();

    //   backgroundImage: `linear-gradient(to left, #febe90, #ffbba8, #ffbcc3, #ffc1dc, #f2c9ef, #e6d1f8, #dbd8fd, #d3dffe, #d3e6fd, #d8ebfb, #e0f0f8, #eaf4f7)`
    return (
        <>
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/20 backdrop-blur-sm">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {/* <DropdownMenuItem className="cursor-pointer" onClick={()=>{
                    setOpen(false);
                    navigate('/users/profile/'+student.id,{replace:true});
                }}>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View Details</span>
                </DropdownMenuItem> */}
                {/* <DropdownMenuItem className="cursor-pointer" >
                    <FileEdit className="mr-2 h-4 w-4 inline" />
                    <span>Update Details</span>
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem  onClick={()=>{
                    setOpen(false);
                    setDeleteDialogOpen(true);
                }} className="cursor-pointer text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete Student</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>


        <DeleteStudentAlert 
            student={student} 
            isLoading={studentDeleteMutation.isPending} 
            open={studentDeleteMutation.isPending || deleteDialogOpen} 
            onOpenChange={setDeleteDialogOpen} 
            handleDelete={handleDelete}
        />
        </>
    )
}
export default StudentTableActionOptions;