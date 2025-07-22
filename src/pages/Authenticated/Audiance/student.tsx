import { CustomSelect } from "@/components/Custom/CustomSelect";
import { SearchDialog } from "@/components/Custom/search-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";
import { user_apis } from "@/lib/helpers/api_urls";
import { cn, useUrlQuery } from "@/lib/utils";
import { setBreadcrumb } from "@/redux/Features/uiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { UserType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { Filter, PlusCircle, RefreshCwIcon, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TableSkeleton } from "@/components/Custom/table-skeleton";
import { ListPagination } from "@/components/Custom/ListPagination";
import StudentTable from "./components/student-table";

export type StudentQueryResponseType = {
    students:UserType[],
    last_page : number,
    per_page : number,
    current_page : number,
    total : number,
}
const StudentPage = () => {
    const {state,isMobile} = useSidebar();
    const dispatch = useAppDispatch();
    const queries = useUrlQuery();
    useEffect(()=>{
        document.title = 'Student List | SKICST';
        dispatch(setBreadcrumb([
            {label:'Dashboard',link:'/dashboard'},
            {label:'Student List',type:'page'}
        ]));
        handleDataLimitQuery(null,null);
    },[])
    const navigate = useNavigate();
        const handleDataLimitQuery = (p?:string|number|null,o?:string|number|null,q?:string|null) => {
            const savedPreference = JSON.parse(localStorage.getItem('preferences') ?? '{}');
            const studentListConfig = savedPreference.studentListConfig ?? {};
            const page = (o||q)? 1 : (p ?? queries.get('page') ?? studentListConfig.page ?? 1);
            const per_page = o ?? queries.get('per_page') ?? studentListConfig.per_page ?? 10;
            const search_query = q ?? queries.get('q') ?? studentListConfig.search_query ?? '';
            localStorage.setItem('preferences',JSON.stringify({
                ...savedPreference,
                studentListConfig:{
                    page,
                    per_page,
                    search_query
                }
            }))
            navigate(`/students/list?page=${page}&per_page=${per_page}${search_query?`&q=${search_query}`:''}`)
        }
    const studentListQuery = useQuery<any,any,StudentQueryResponseType>({
        queryKey:['students',queries.get('page'),queries.get('per_page'),queries.get('q')],
        queryFn: ()=>user_apis.list(queries.get('page')),
        select: (res)=> res.data,
        staleTime : 10 * 60 * 60 * 100,
        gcTime : 10 * 60 * 60 * 100,
        enabled : !!queries.get('page') || !!queries.get('per_page') || !!queries.get('q')
    });
    const handleOnSearch = (e:string) => handleDataLimitQuery(null,null,encodeURIComponent(e));
    return (
        <div className="container px-4 sm:px-8">
            <div className="my-3 grid gap-2">
                <h1 className="text-2xl md:text-2xl font-bold">Student Management</h1>
                <p className="text-muted-foreground text-xs md:text-sm" >All students are listed here. Click new student button to add new student or click pencil icon on the student to update a student.</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-between md:items-center items-end mt-6">
            <div className="flex gap-2">
                    <CustomSelect
                        options={Array.from([10,20,30,40,50,60]).map(i=>({label:`${i} per page`,value:i}))}
                        dropdownClassName="bg-background/40 backdrop-blur-sm"
                        className="hidden md:flex md:w-40"
                        value={queries.get('per_page') ?? '10'}
                        onValueChange={(e)=>handleDataLimitQuery(null,e)}
                    />
                    <Button onClick={()=>studentListQuery.refetch()} variant={'secondary'} size={'icon'}><RefreshCwIcon className={cn("size-4",studentListQuery.isLoading || studentListQuery.isRefetching ? 'animate-spin':'')} /></Button>
                </div>
                <div className="flex gap-2">
                    <SearchDialog onSearch={handleOnSearch} defaultValue={queries.get('q')??''} placeholder="Search by kewords and press enter ..." />
                    <Button variant={'outline'}><Filter className="size-4 md:me-2 inline" /> <span className="hidden md:inline">Filters</span></Button>
                    <Button onClick={()=>navigate('/students/admission')}>
                        <PlusCircle className="size-4 me:me-2 inline" /> 
                        <span className="hidden md:inline">New Student</span>
                    </Button>
                </div>
            </div>
            {queries.get('q') && <div className="flex gap-2 items-center mt-4 ">
                <p className="text-muted-foreground text-sm ml-2 relative z-10">
                    Showing results for <span className="text-primary font-bold">{queries.get('q')}</span>
                </p>
                <Button onClick={()=>handleDataLimitQuery(null,null,'')} variant={'secondary'} size={'sm'} className="backdrop-blur-sm">
                    Clear Search<XCircle className="inline size-4" /> 
                </Button>
            </div>}
            <Card className={cn( !isMobile? (state === 'expanded' ?"max-w-[calc(100vw-20rem)] " : "max-w-[calc(100vw-8rem)] ") :" ","overflow-hidden border-border/40 my-4 transition-all duration-300")}  >
                <CardContent className="p-0 flex flex-col">
                    {studentListQuery.isLoading && <TableSkeleton />}
                    {studentListQuery.data && <StudentTable users={studentListQuery.data.students} /> }
                </CardContent>
            </Card>
            <div className="mt-6 grid">
                {studentListQuery.data?.students && studentListQuery.data.students.length > 0 && (
                    <ListPagination
                        last_page={studentListQuery.data?.last_page ?? 1}
                        current_page={Number(queries.get('page')) ?? 1}
                        url_end_point="students/list"
                        onPageChange={(p)=>handleDataLimitQuery(p,null)}
                    />
                )}
            </div>
        </div>
    )
}

export default StudentPage;