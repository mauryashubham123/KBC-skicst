import { Calendar } from "lucide-react";

export const TableEmptyState = ({
    title="No record Found",
    message="No data match your current filter criteria. Try adjusting your filters or add new data."
}:{title?:string,message?:string}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="h-20 w-20 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                <Calendar className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <p className="text-muted-foreground max-w-sm">
                {message}
            </p>
        </div>
    );
};