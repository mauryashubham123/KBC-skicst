
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KbcEventType } from "@/types/user";
import { Eye, Lock, Unlock } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { kbc } from "@/lib/helpers/api_urls";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
interface EventCardProps {
    event: KbcEventType;
    isSubscribed?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, isSubscribed }) => {
    const queryClient = useQueryClient();

    // Reveal Answer Mutation
    const subcribeMutation = useMutation({
        mutationFn: () => kbc.audiance_apis.subscribeEvent(`${event.id}`),
        onSuccess: (res: any) => {
            toast.success(res.message || 'subcribe successfully');
            queryClient.invalidateQueries({ queryKey: ['mysubscriptions'] });
        },
        onError: (e: any) => {
            toast.error(e?.response?.data?.message || e.message || 'Failed to subcribe');
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

                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                {
                    isSubscribed ?(
                        <div className="flex flex-wrap gap-2">
                            <Button className="bg-green-700" size="sm" onClick={() => navigate(`/event/${event.id}`)}>
                                <Eye className="size-3 mr-1" />
                                View Event
                            </Button>
                        </div>
                    ):(
                        !event.is_locked && 
                        <div className="flex flex-wrap gap-2">
                            <Button variant="secondary" size="sm"  onClick={()=>subcribeMutation.mutate()}  >
                                <Lock className="size-3 mr-1" />
                                Subcribe
                            </Button>
    
                        </div>
                    )
                }
            </CardContent>
        </Card>
    );
};

export default EventCard;