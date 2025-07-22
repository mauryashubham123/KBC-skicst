import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { tableStyles } from "@/lib/helpers/constants";
import { ColumnFilterType, SortConfigType } from "@/types/typedef";
import TableHeaderComponent from "@/components/Custom/table-header";
import React from "react";


type DataTableProps<T> = {
    data: T[];
    sortConfig: SortConfigType;
    handleSort: (field: string) => void;
    columnsFilters?: ColumnFilterType<T>;
    actionRowComponent?:React.ReactNode
}

export const DataTable = <T extends object>({ data, sortConfig, handleSort, columnsFilters}: DataTableProps<T>) => {
    function renderCellValue(value: unknown): React.ReactNode {
        if ( typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || React.isValidElement(value))
        return value;
        return JSON.stringify(value);
      }
      
    return (
        <div className={tableStyles.tableWrapper}>
            <Table className={tableStyles.table}>
                <TableHeaderComponent sortConfig={sortConfig} handleSort={handleSort} columnsFilters={columnsFilters} />
                <TableBody>
                    {data.map((row:T, i:number) => (
                        <TableRow key={i} className={cn("group whitespace-nowrap", i % 2 === 0 ? "" : "bg-muted/50")}>
                            {columnsFilters && (Object.entries(columnsFilters)as [keyof T, typeof columnsFilters[keyof T]][]).map(([key, config], index) =>
                                config?.status === 'show' && (
                                    <TableCell key={index} className={cn("font-medium",config.dataClass)}>
                                        {config.renderable
                                            ? config.renderable(row[config.shortingKey ?? key], row, i)
                                            : renderCellValue(row[config.shortingKey ?? key])}
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
