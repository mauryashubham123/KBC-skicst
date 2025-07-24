import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Loader2, Lock, Unlock } from "lucide-react";




interface LockStatusBadgeProps {
    isLocked: boolean;
    isPending: boolean;
}

export default function LockStatusBadge({ isLocked, isPending }: LockStatusBadgeProps) {
    return (
        <Badge
            className={cn(
                "flex items-center gap-1 px-3 py-1 text-white text-sm rounded-full transition-colors duration-300",
                isPending
                    ? "bg-muted text-muted-foreground"
                    : isLocked
                        ? "bg-red-600"
                        : "bg-green-600"
            )}
        >
            {isPending ? (
                <Loader2 className="animate-spin w-4 h-4" />
            ) : isLocked ? (
                <>
                    <Lock className="w-4 h-4" />
                    Locked
                </>
            ) : (
                <>
                    <Unlock className="w-4 h-4" />
                    Unlocked
                </>
            )}
        </Badge>
    );
}