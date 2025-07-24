import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KbcEventType } from "@/types/user";
import { Trash2, Play, Pause, Lock, Unlock, Eye, Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kbc } from "@/lib/helpers/api_urls";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
    event: KbcEventType;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const queryClient = useQueryClient();

    // Delete Event Mutation
    const deleteMutation = useMutation({
        mutationFn: () => kbc.event_apis.deleteEvent(event.id),
        onSuccess: (res) => {
            toast.success(res.message || 'Event deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['events'] });
            setDeleteDialogOpen(false);
        },
        onError: (e: any) => {
            toast.error(e?.response?.data?.message || e.message || 'Failed to delete event');
        }
    });

    // Toggle Event Status Mutation
    const toggleStatusMutation = useMutation({
        mutationFn: (status: 'active' | 'inactive') =>
            kbc.event_apis.setEventStatus(`id=${event.id}&status=${status}`),
        onSuccess: (res) => {
            toast.success(res.message || 'Event status updated successfully');
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
        onError: (e: any) => {
            toast.error(e?.response?.data?.message || e.message || 'Failed to update event status');
        }
    });

    // Toggle Question Lock Status Mutation
    const toggleLockMutation = useMutation({
        mutationFn: (status: 'locked' | 'unlocked') =>
            kbc.event_apis.setEventQuestionLockStatus(`id=${event.id}&status=${status}`),
        onSuccess: (res) => {
            toast.success(res.message || 'Question lock status updated successfully');
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
        onError: (e: any) => {
            toast.error(e?.response?.data?.message || e.message || 'Failed to update lock status');
        }
    });


    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (isActive: boolean) => {
        return isActive
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    };

    const navigate = useNavigate();
    
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 flex gap-2">{event.name}
                            <LockStatusBadge
                                isLocked={event.is_locked}
                                isPending={toggleLockMutation.isPending}

                            />
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                            {event.description}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span>Start: {formatDateTime(event.start_time)}</span>
                            <span>•</span>
                            <span>End: {formatDateTime(event.end_time)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                        <Badge className={getStatusColor(event.is_active)}>
                            {event.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        {/* <span className="text-xs text-muted-foreground">
                            Duration: {event.question_duration}
                        </span> */}
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                {/* Current Question Info */}
                {event.liveQuestion && (
                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex justify-between items-start gap-2">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                    Current Question:
                                </p>
                                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 line-clamp-2">
                                    {event.liveQuestion.body}
                                </p>
                            </div>
                            <div className="flex gap-1">
                                {event.is_locked && (
                                    <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                                        Locked
                                    </Badge>
                                )}
                                {event.answer_reveal && (
                                    <Badge variant="outline" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                        Revealed
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">

                    {/* Toggle Status */}
                    <Button
                        variant={event.is_active ? "destructive" : "default"}
                        size="sm"
                        onClick={() => toggleStatusMutation.mutate(event.is_active ? 'inactive' : 'active')}
                        disabled={toggleStatusMutation.isPending}
                    >
                        {event.is_active ? (
                            <>
                                <Pause className="size-3 mr-1" />
                                Stop
                            </>
                        ) : (
                            <>
                                <Play className="size-3 mr-1" />
                                Start
                            </>
                        )}
                    </Button>

                   
                    
                    {/* View Event */}
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate('/event-management/events/view/' + event.id)}
                    >
                        <Eye className="size-3 mr-1" />
                        View
                    </Button>

                    {/* Delete Event */}
                    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="size-3 mr-1" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Event</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete "{event.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => deleteMutation.mutate()}
                                    disabled={deleteMutation.isPending}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
};


export default EventCard;


interface LockStatusBadgeProps {
    isLocked: boolean;
    isPending: boolean;
}
function LockStatusBadge({
    isLocked,
    isPending,
}: LockStatusBadgeProps) {
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