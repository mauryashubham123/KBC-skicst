import { CustomSelect } from "@/components/Custom/CustomSelect";
import { SearchDialog } from "@/components/Custom/search-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";
import { role_apis, user_apis } from "@/lib/helpers/api_urls";
import { cn, useUrlQuery } from "@/lib/utils";
import { setBreadcrumb } from "@/redux/Features/uiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { RoleType, UserType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { RefreshCwIcon, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TableSkeleton } from "@/components/Custom/table-skeleton";
import { ListPagination } from "@/components/Custom/ListPagination";
import StudentTable from "../Audiance/components/student-table";
import CreateUserDialog from "../Admin/User/create-user-dialog";

export type UserQueryResponseType = {
    users: UserType[],
    last_page: number,
    per_page: number,
    current_page: number,
    total: number,
}
const UserPage = () => {
    const { state, isMobile } = useSidebar();
    const dispatch = useAppDispatch();
    const queries = useUrlQuery();
    useEffect(() => {
        document.title = 'User List | SKICST';
        dispatch(setBreadcrumb([
            { label: 'Dashboard', link: '/dashboard' },
            { label: 'User List', type: 'page' }
        ]));
        handleDataLimitQuery(null, null, null, null);
    }, [])
    const navigate = useNavigate();
    const handleDataLimitQuery = (p?: string | number | null, o?: string | number | null, r?: string | number | null, q?: string | null) => {
        const savedPreference = JSON.parse(localStorage.getItem('preferences') ?? '{}');
        const userListConfig = savedPreference.userListConfig ?? {};
        const page = (o || q) ? 1 : (p ?? queries.get('page') ?? userListConfig.page ?? 1);
        const per_page = o ?? queries.get('per_page') ?? userListConfig.per_page ?? 10;
        const role_id = r ?? queries.get('role_id') ?? userListConfig.role_id;
        const search_query = q ?? queries.get('q') ?? userListConfig.search_query ?? '';
        localStorage.setItem('preferences', JSON.stringify({
            ...savedPreference,
            userListConfig: {
                page,
                per_page,
                role_id,
                search_query
            }
        }))
        navigate(`/users/list?page=${page}&per_page=${per_page}${search_query ? `&q=${search_query}` : ''}${role_id ? '&role_id=' + role_id : ''}`)
    }
    const userListQuery = useQuery<any, any, UserQueryResponseType>({
        queryKey: ['users', queries.get('page'), queries.get('per_page'), queries.get('q'), queries.get('role_id')],
        queryFn: () => user_apis.list(`?&page=${queries.get('page') ?? 1}&offset=${queries.get('per_page') ?? 10}${queries.get('q') ? '&search_query=' + queries.get('q') : ''}${queries.get('role_id') && queries.get('role_id')!=='all'? '&role_id=' + queries.get('role_id') : ''}`),
        select: (res) => res.data,
        staleTime: 10 * 60 * 60 * 100,
        gcTime: 10 * 60 * 60 * 100,
        enabled: !!queries.get('page') || !!queries.get('per_page') || !!queries.get('q') || !!queries.get('role_id')
    });
    const rolelistQuery = useQuery<any, any, RoleType[]>({
        queryKey: ['roles'],
        queryFn: role_apis.list,
        select: (res) => res.data.roles,
        staleTime: 10 * 60 * 60 * 100,
        gcTime: 10 * 60 * 60 * 100,
    });
    const handleOnSearch = (e: string) => handleDataLimitQuery(null, null, null, encodeURIComponent(e));
    return (
        <div className="container px-4 sm:px-8">
            <div className="my-3 grid gap-2">
                <h1 className="text-2xl md:text-2xl font-bold">KBC User Management</h1>
                <p className="text-muted-foreground text-xs md:text-sm" >All user are listed here. if you want any user Update then click vertical dot icon on the user to update a users.</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-between md:items-center items-end mt-6">
                <div className="flex gap-2">
                    <CustomSelect
                        options={Array.from([10, 20, 30, 40, 50, 60]).map(i => ({ label: `${i} per page`, value: i }))}
                        dropdownClassName="bg-background/40 backdrop-blur-sm"
                        className="hidden md:flex md:w-40"
                        value={queries.get('per_page') ?? '10'}
                        onValueChange={(e) => handleDataLimitQuery(null, e)}
                    />
                    <Button onClick={() => userListQuery.refetch()} variant={'secondary'} size={'icon'}><RefreshCwIcon className={cn("size-4", userListQuery.isLoading || userListQuery.isRefetching ? 'animate-spin' : '')} /></Button>
                </div>
                <div className="flex gap-2">
                    <SearchDialog onSearch={handleOnSearch} defaultValue={queries.get('q') ?? ''} placeholder="Search by kewords and press enter ..." />
                    <CustomSelect 
                        className="w-44"
                        dropdownClassName="bg-background/40 backdrop-blur-sm"
                        value={queries.get('role_id') ?? 'all'}
                        options={[
                            {label: 'All User Type', value: 'all'}, 
                            ...(rolelistQuery.data?.map(role => ({
                                label: `${role.name} (${role.type})`,
                                value: role.id.toString()
                            })) || [])
                        ]} 
                        onValueChange={v=>{
                           handleDataLimitQuery(1,null,v,null)
                        }}
                    />
                 <CreateUserDialog />
                </div>
            </div>
            {queries.get('q') && <div className="flex gap-2 items-center mt-4 ">
                <p className="text-muted-foreground text-sm ml-2 relative z-10">
                    Showing results for <span className="text-primary font-bold">{queries.get('q')}</span>
                </p>
                <Button onClick={() => handleDataLimitQuery(null, null, null, '')} variant={'secondary'} size={'sm'} className="backdrop-blur-sm">
                    Clear Search<XCircle className="inline size-4" />
                </Button>
            </div>}
            <Card className={cn(!isMobile ? (state === 'expanded' ? "max-w-[calc(100vw-20rem)] " : "max-w-[calc(100vw-8rem)] ") : " ", "overflow-hidden border-border/40 my-4 transition-all duration-300")}  >
                <CardContent className="p-0 flex flex-col">
                    {userListQuery.isLoading && <TableSkeleton />}
                    {userListQuery.data && <StudentTable users={userListQuery.data.users} />}
                </CardContent>
            </Card>
            <div className="mt-6 grid">
                {userListQuery.data?.users && userListQuery.data.users.length > 0 && (
                    <ListPagination
                        last_page={userListQuery.data?.last_page ?? 1}
                        current_page={Number(queries.get('page')) ?? 1}
                        url_end_point="users/list"
                        onPageChange={(p) => handleDataLimitQuery(p, null)}
                    />
                )}
            </div>
        </div>
    )
}

export default UserPage;