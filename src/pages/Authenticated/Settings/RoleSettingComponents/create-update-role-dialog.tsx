import { CustomSelect } from "@/components/Custom/CustomSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { role_apis } from "@/lib/helpers/api_urls";
import { ROLE_TYPES } from "@/lib/helpers/constants";
import { RoleType } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusCircle } from "lucide-react";
import React, { ReactNode } from "react";
import { toast } from "sonner";

const CreateUpdateRoleDialog:React.FC<{role?:RoleType,children?: ReactNode}> = ({role,children}) => {
    const [open,setOpen] = React.useState(false);
    const queryClient = useQueryClient();
    const productMutation = useMutation({
        mutationFn:(data:FormData)=>role?role_apis.update(data,role.id):role_apis.create(data),
        onSuccess: (res) => {
            toast.success(res.message);
            setOpen(false);
            queryClient.invalidateQueries({queryKey:['roles'],exact:false});
        },
        onError:(e:any)=>toast.error(e?.response?.data?.message ?? e.message)
    });
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        productMutation.mutate(formData);
    }
    return (
        <Dialog open={open || productMutation.isPending} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ?? 
                    <Button className="flex gap-2">
                        <PlusCircle className="size-4 inline" />
                        <span className="hidden md:inline">{role?'Update Role':'Add New Role'}</span>
                    </Button>
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{role?'Update Role':'Add New Role'}</DialogTitle>
                    <DialogDescription>{role?'Change the role details and click update to change the role information.':'Enter the details for the new role. Click save when you\'re done.'}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label>Role Name</Label>
                            <Input name="name" disabled={productMutation.isPending} defaultValue={role?.name} type="text" placeholder="Enter Role Name" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Role Type</Label>
                            <CustomSelect defaultValue={role?.type} name="type" disabled={productMutation.isPending} options={ROLE_TYPES.map(r=>({label:r,value:r}))} />
                            <p className="text-muted-foreground text-[10px] ml-1" >Single user type can have multipel roles</p>
                        </div>
                        <div className="grid gap-2">
                            <Label>Priority (1 to 100)</Label>
                            <Input name="priority" disabled={productMutation.isPending} defaultValue={role?.priority} type="text" placeholder="Enter Role Priority" />
                            <p className="text-muted-foreground text-[10px] ml-1" >Lower priority values has more permissions</p>
                        </div>
                    </div>
                    <DialogFooter className="gap-2 mt-4">
                        <DialogClose asChild>
                            <Button disabled={productMutation.isPending} variant={'secondary'}>Close</Button>
                        </DialogClose>
                        <Button disabled={productMutation.isPending} type="submit" className="">
                            {productMutation.isPending && <Loader2 className="animate-spin inline size-4" />}
                            {productMutation.isPending ? (role ? 'Updating...' : 'Saving...') : (role ? 'Update' : 'Save')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default CreateUpdateRoleDialog