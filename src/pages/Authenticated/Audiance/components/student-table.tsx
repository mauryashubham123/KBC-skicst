import { DataTable } from "@/components/Custom/table-main";
import { ColumnFilterType } from "@/types/typedef";
import { UserType } from "@/types/user";
import { useMemo } from "react";
import { tableStyles } from "@/lib/helpers/constants";
import { TableEmptyState } from "@/components/Custom/table-empty-state";
// import { useNavigate } from "react-router-dom";
import { UserDescriptionWithAvatar } from "@/components/Custom/user-short-description";
import StudentTableActionOptions from "./student-table-action-options";


const UserTable = ({ users }: { users: UserType[] }) => {
    // const navigate = useNavigate();
    const qualificationOptions = [
        { label: 'class 8', value: '8' },
        { label: 'class 9', value: '9' },
        { label: 'class 10', value: '10' },
        { label: 'class 11', value: '11' },
        { label: 'class 12', value: '12' },
        { label: 'Graduation', value: '13' },
        { label: 'Post Graduation', value: '14' }
    ];
    const columnFilters = useMemo<ColumnFilterType<UserType>>(() => ({
        // 'User ID': { status: 'show', isSortable: false, shortingKey: 'username' },
        Student: {
            status: 'show', isSortable: true, shortingKey: 'name', renderable: (_value: any, row: UserType) => {
                return <UserDescriptionWithAvatar className="cursor-pointer" user={row} showContact={false} />
            }
        },
        'Phone': { status: 'show', isSortable: false, shortingKey: 'phone' },
        'User Type': {
            status: 'show',
            isSortable: false,
            shortingKey: 'role',
            renderable: (_value: any, row: any) => {
                return row?.role?.name ?? '-';
            }
        },
        'Qualification': {
            status: 'show',
            isSortable: false,
            shortingKey: 'details',
            renderable: (details: any[]) => {
                const qualificationObj = details?.find(item => item.key === 'qualification');
                const value = qualificationObj?.value ?? null;
                const matched = qualificationOptions.find(q => q.value === value);
                return matched?.label ?? '-';
            }
        },
        'Address': {
            status: 'show',
            isSortable: false,
            shortingKey: 'details',
            renderable: (details: any[]) => {
                const qualificationObj = details?.find(item => item.key === 'address');
                const value = qualificationObj?.value ?? null;
                return value ?? '-';
            }
        },

        More: {
            status: 'show',
            isSortable: false,
            shortingKey: 'action',
            headerClass: "text-rignt w-fit " + tableStyles.stickyColumn,
            dataClass: "text-right w-fit " + tableStyles.stickyColumn,
            renderable: (_value: any, row: UserType) => <StudentTableActionOptions student={row} />
        },
    }), []);
    if (!users.length) {
        return <TableEmptyState />
    }
    return (
        <DataTable
            data={users}
            sortConfig={{ field: 'id', order: 'asc' }}
            handleSort={() => { }}
            columnsFilters={columnFilters}
        />
    );
};

export default UserTable;