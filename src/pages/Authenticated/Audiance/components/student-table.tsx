import { DataTable } from "@/components/Custom/table-main";
import { ColumnFilterType } from "@/types/typedef";
import { UserType } from "@/types/user";
import { useMemo, useState } from "react";
import { tableStyles } from "@/lib/helpers/constants";
import { TableEmptyState } from "@/components/Custom/table-empty-state";
import { UserDescriptionWithAvatar } from "@/components/Custom/user-short-description";
import StudentTableActionOptions from "./student-table-action-options";
import { user_apis } from "@/lib/helpers/api_urls";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const RoleToggle = ({ user }: { user: UserType }) => {
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const currentRoleId = user?.role?.id ?? user?.role_id;

    // Only allow toggling if role is 5 (Active) or 13 (Pending)
    const isPending = currentRoleId === 13;
    const isActive = currentRoleId === 5;

    if (!isPending && !isActive) {
        return (
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border font-medium">
                {user?.role?.name ?? '-'}
            </span>
        );
    }

    const handleToggle = async () => {
        if (isLoading) return;
        setIsLoading(true);
        const targetRoleId = isPending ? 5 : 13;

        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("phone", user.phone);
        if (user.email) formData.append("email", user.email);
        formData.append("role_id", targetRoleId.toString());
        if (user.gender) formData.append("gender", user.gender);
        if (user.dob) formData.append("dob", user.dob.split('T')[0]);

        try {
            const response = await user_apis.update(formData, user.id);
            toast.success(response.message || "Status updated successfully!");
            // Invalidate react-query cache to refresh student list
            queryClient.invalidateQueries({ queryKey: ["students"], exact: false });
            queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message || "Failed to update role");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border shadow-xs select-none disabled:opacity-75 cursor-pointer active:scale-95 duration-150 ${isActive
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50"
                : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/50"
                }`}
            title={isActive ? "Click to Deactivate / pending" : "Click to Activate"}
        >
            {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : isActive ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
                <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            )}
            <span>{isActive ? "Active" : "Pending"}</span>
        </button>
    );
};

const UserTable = ({ users }: { users: UserType[] }) => {
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
        Student: {
            status: 'show', isSortable: true, shortingKey: 'name', renderable: (_value: any, row: UserType) => {
                return <UserDescriptionWithAvatar className="cursor-pointer" user={row} showContact={false} />
            }
        },
        'Phone': { status: 'show', isSortable: false, shortingKey: 'phone' },
        'Status': {
            status: 'show',
            isSortable: false,
            shortingKey: 'role',
            renderable: (_value: any, row: UserType) => {
                return <RoleToggle user={row} />;
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