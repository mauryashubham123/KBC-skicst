
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KbcEventType } from "@/types/user";
import { Calendar, CheckCircle, Clock, Eye, Lock, Play, Unlock, Users } from "lucide-react";
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
    const showEventQuestion = () => {
        navigate(`/events/view/${event.id}`);
    };
    return (
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-3">
                        <CardTitle className="text-xl font-bold text-amber-900 line-clamp-2">
                            {event.title || "KBC Event"}
                        </CardTitle>
                        <p className="text-sm text-amber-800 leading-relaxed line-clamp-3">
                            {event.description}
                        </p>
                        
                        {/* Event Details */}
                        <div className="flex flex-wrap gap-4 text-xs text-amber-700">
                            <div className="flex items-center gap-1">
                                <Calendar className="size-3" />
                                <span>{formatDateTime(event.start_time)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="size-3" />
                                <span>{formatDateTime(event.end_time)}</span>
                            </div>
                            {event.participants_count && (
                                <div className="flex items-center gap-1">
                                    <Users className="size-3" />
                                    <span>{event.participants_count} participants</span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 items-end">
                        <Badge className={`${getStatusColor(event.is_active)} font-medium px-3 py-1`}>
                            {event.is_active ? (
                                <><Play className="size-3 mr-1" />Live</>
                            ) : (
                                <>Ended</>
                            )}
                        </Badge>
                        
                        {event.is_locked && (
                            <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                                <Lock className="size-3 mr-1" />
                                Locked
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Current Live Question */}
                {event.liveQuestion && event.is_active && (
                    <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-lg"></div>
                        <div className="relative p-4 bg-gradient-to-r from-amber-50 to-orange-50 backdrop-blur-sm rounded-lg border border-amber-300 shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                                    <Eye className="size-4 text-amber-800" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-amber-900 mb-1">
                                        🔴 Live Question
                                    </p>
                                    <p className="text-sm text-amber-800 leading-relaxed line-clamp-2 font-medium">
                                        {event.liveQuestion.body}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Subscription Status & Actions */}
                <div className="border-t border-amber-200 pt-4">
                    {isSubscribed ? (
                        // Already Subscribed - Show Join Event
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-emerald-800 bg-emerald-100 px-3 py-2 rounded-lg border border-emerald-200">
                                <CheckCircle className="size-4" />
                                <span className="text-sm font-medium">आप इस event के लिए registered हैं</span>
                            </div>
                            <Button 
                                onClick={() => showEventQuestion()}
                                className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:via-orange-700 hover:to-amber-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                                size="lg"
                            >
                                <Eye className="size-4 mr-2" />
                                Join Championship
                            </Button>
                        </div>
                    ) : (
                        // Not Subscribed - Show Subscribe Option
                        <div className="space-y-3">
                            {event.is_locked ? (
                                <div className="text-center py-4 bg-stone-50 rounded-lg border border-stone-200">
                                    <Lock className="size-8 text-stone-500 mx-auto mb-2" />
                                    <p className="text-sm text-stone-600 font-medium">Event is currently locked</p>
                                    <p className="text-xs text-stone-500 mt-1">Registration will open soon</p>
                                </div>
                            ) : (
                                <>
                                    <div className="bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 rounded-lg p-3">
                                        <p className="text-sm text-amber-900 font-semibold mb-1">
                                            📋 Registration Required
                                        </p>
                                        <p className="text-xs text-amber-800">
                                            Championship में participate करने के लिए पहले subscribe करें
                                        </p>
                                    </div>
                                    <Button 
                                        onClick={()=>subcribeMutation.mutate()}
                                        className="w-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-700 hover:via-amber-700 hover:to-orange-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-orange-400"
                                        size="lg"
                                    >
                                        <Unlock className="size-4 mr-2" />
                                        Subscribe to Join
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                </div>
                {/* Event Timeline Indicator */}
                <div className="flex items-center justify-center pt-2">
                    <div className="flex items-center gap-2 text-xs text-amber-700 font-medium">
                        <div className={`w-2 h-2 rounded-full ${isSubscribed ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
                        <span>Subscribe</span>
                        <div className="w-4 h-px bg-amber-300"></div>
                        <div className={`w-2 h-2 rounded-full ${isSubscribed ? 'bg-amber-500' : 'bg-amber-300'}`}></div>
                        <span>Join Event</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    





    );
};

export default EventCard;