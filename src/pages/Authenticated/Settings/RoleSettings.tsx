import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { role_apis } from "@/lib/helpers/api_urls";
import { cn } from "@/lib/utils";
import { setBreadcrumb } from "@/redux/Features/uiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { RoleType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { PenLine, Plus, RefreshCw, Trash2, UserSearchIcon } from "lucide-react";
import { useEffect } from "react";
import DeleteRoleDialog from "./RoleSettingComponents/delete-role-dialog";
import CreateUpdateRoleDialog from "./RoleSettingComponents/create-update-role-dialog";
import illustration_role from '@/assets/illustrations/authentication-animate.svg';


const RoleSettings = () => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        document.title = 'Role Settings | SKICST';
        dispatch(setBreadcrumb([
            {label:'Dashboard',link:'/dashboard'},
            {label:'Role Settings',type:'page'}
        ]))
    },[]);
    const rolelistQuery  = useQuery<any,any,RoleType[]>({
        queryKey: ['roles'],
        queryFn: role_apis.list,
        select: (res) => res.data.roles,
        staleTime : 10 * 60 * 60 * 100,
        gcTime : 10 * 60 * 60 * 100,
    });

    return (
        <div className="container grid gap-6 p-6">
            <div className="fixed left-1/2 top-1/2 -translate-x-1/3 -translate-y-1/2 opacity-20 z-0">
                <img src={illustration_role} alt="illustration" className="w-[480px]" />
            </div>
            <div className="flex gap-2 justify-between items-center relative z-10">
                <h1 className="text-3xl font-bold">Role Settings</h1>
                <div className="flex gap-2">
                    <Button disabled={rolelistQuery.isRefetching || rolelistQuery.isLoading} onClick={()=>rolelistQuery.refetch()} size={'icon'} variant={'outline'}>
                        <RefreshCw className={cn("size-4",rolelistQuery.isRefetching || rolelistQuery.isLoading ? 'animate-spin':'')} />
                    </Button>
                    <CreateUpdateRoleDialog>
                        <Button ><Plus className="size-4 inline me-2"/>New Role</Button>
                    </CreateUpdateRoleDialog>
                </div>
            </div>
            {rolelistQuery.isLoading && <RoleSettingsSkeleton />}
            <div className="grid gap-4  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {rolelistQuery?.data?.map(r=>(<RoleCard key={r.id} {...r} />))}
            </div>
        </div>
    );
}
export default RoleSettings;

const RoleSettingsSkeleton:React.FC = () => {
    return (
        <Skeleton>

        </Skeleton>
    )
}

const RoleCard:React.FC<RoleType> = (role) => {
    const priorities = [
        {value:1,label:'Super user',color:'bg-violet-900'},
        {value:2,label:'Highest',color:'bg-red-600'},
        {value:3,label:'High',color:'bg-amber-500'},
        {value:4,label:'Moderate',color:'bg-cyan-600'},
        {value:5,label:'Low',color:'bg-[#679b08]'},
        {value:6,label:'Lowest',color:'bg-primary'},
        {value:7,label:'None'},
        {value:8,label:'None'},
    ]
    return (
        <Card className="shadow-md hover:scale-105 transition-all duration-300 bg-background/25 backdrop-blur-sm">
            <CardHeader className="flex flex-row gap-2 items-center justify-between">
                <div className="grid gap-2">
                    <CardTitle className="text-lg font-semibold whitespace-nowrap flex items-center">
                        <small className="text-xs w-fit text-muted-foreground whitespace-nowrap me-1">#{role.id}</small>
                        {role.name}
                    </CardTitle>
                </div>
                <div className="flex gap-2">
                    <RoleCardOptions role={role} />
                </div>
            </CardHeader>
            <CardContent className="flex gap-2 justify-between">
                <p>{role.type}</p>
                <Badge className={`text-xs w-fit whitespace-nowrap ${priorities.find(p=>p.value == role.priority)?.color || "bg-primary"}`}>{role.priority}</Badge>
            </CardContent>
        </Card>
    )
}

const RoleCardOptions:React.FC<{role:RoleType,className?:string}> = ({role,className}) => {
    return (
        <div className={cn("group grid gap-3 grid-cols-3 place-items-center place-content-center border rounded-lg p-2 hover:scale-105 hover:shadow-md transition-all duration-300",className)}>
            <UserSearchIcon className="size-4 inline cursor-pointer text-muted-foreground hover:text-green-500 group-hover:text-green-500" />
            <CreateUpdateRoleDialog role={role}>
                <PenLine className="size-4 inline cursor-pointer text-muted-foreground hover:text-cyan-600 group-hover:text-cyan-600" />
            </CreateUpdateRoleDialog>
            <DeleteRoleDialog role={role}>
                <Trash2 className="size-4 inline cursor-pointer text-muted-foreground hover:text-red-600 group-hover:text-red-600" />
            </DeleteRoleDialog>
        </div>
    )
}