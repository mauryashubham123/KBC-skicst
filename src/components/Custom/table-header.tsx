import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tableStyles } from "@/lib/helpers/constants";
import { cn } from "@/lib/utils";
import { ColumnFilterType, SortConfigType } from "@/types/typedef";
import { ArrowDown, ArrowUp } from "lucide-react";

const TableHeaderComponent = <T extends object>({
    columnsFilters,
    handleSort,
    sortConfig
}:{
    columnsFilters?:ColumnFilterType<T>,
    handleSort: (field: string) => void;
    sortConfig: SortConfigType;
}) => {
    const renderSortIndicator = (field: string) => {
        if (sortConfig.field !== field) {
            return null;
        }
        return sortConfig.order === 'asc' ? 
            <ArrowUp className="ml-1 h-4 w-4 inline" /> : 
            <ArrowDown className="ml-1 h-4 w-4 inline" />;
    };
    return (
        <TableHeader className={cn("bg-muted/50", tableStyles.stickyHeader)}>
            <TableRow className="whitespace-nowrap">
                {columnsFilters && (Object.entries(columnsFilters) as [keyof T, ColumnFilterType<T>[keyof T]][]).map(([key, config], index) =>
                    config?.status === 'show' && (
                        <TableHead
                            key={index}
                            className={cn("select-none", config?.isSortable && "cursor-pointer",config.headerClass)}
                            onClick={() =>
                                config?.isSortable && handleSort(config.shortingKey?.toString() ?? key.toString())
                            }
                        >
                            {key.toString()}
                            {config?.isSortable && renderSortIndicator(config.shortingKey?.toString() ?? key.toString())}
                        </TableHead>
                    )
                )}
            </TableRow>
        </TableHeader>
    );
}

export default TableHeaderComponent;