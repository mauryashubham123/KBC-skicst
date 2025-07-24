import { kbc } from "@/lib/helpers/api_urls";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, HelpCircle, Target, Play, Pause, Lock, Unlock, Eye, Trash2, Loader2, ArrowLeft } from "lucide-react";
import { useState } from "react";
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
import LockStatusBadge from "./Components/lock-status-badge";
import { Separator } from "@/components/ui/separator";
import ViewEventQuestionSection from "./Components/view-event-question-section";
import ShowResultDialog from "./Components/show-result-dialog";



export default function EventViewPage() {
    const { event_id } = useParams<{ event_id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    
    const eventDetails = useQuery<any>({
        queryKey: ['eventDetails', event_id],
        queryFn: () => kbc.audiance_apis.getEventUpdates(`event_id=${event_id}&since=${Date.now()}&counter=0`),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        select: (res) => res.data,
    });

    // Delete Event Mutation
    const deleteMutation = useMutation({
        mutationFn: () => kbc.event_apis.deleteEvent(Number(event_id)),
        onSuccess: (res) => {
            toast.success(res.message || 'Event deleted successfully');
            navigate('/event-management/events');
        },
        onError: (e: any) => {
            toast.error(e?.response?.data?.message || e.message || 'Failed to delete event');
        }
    });

    // Toggle Event Status Mutation
    const toggleStatusMutation = useMutation({
        mutationFn: (status: 'active' | 'inactive') =>
            kbc.event_apis.setEventStatus(`id=${event_id}&status=${status}`),
        onSuccess: (res) => {
            toast.success(res.message || 'Event status updated successfully');
            queryClient.invalidateQueries({ queryKey: ['eventDetails'] });
        },
        onError: (e: any) => {
            toast.error(e?.response?.data?.message || e.message || 'Failed to update event status');
        }
    });

    // Toggle Question Lock Status Mutation
    const toggleLockMutation = useMutation({
        mutationFn: (status: 'locked' | 'unlocked') =>
            kbc.event_apis.setEventQuestionLockStatus(`id=${event_id}&status=${status}`),
        onSuccess: (res) => {
            toast.success(res.message || 'Question lock status updated successfully');
            queryClient.invalidateQueries({ queryKey: ['eventDetails'] });
        },
        onError: (e: any) => {
            toast.error(e?.response?.data?.message || e.message || 'Failed to update lock status');
        }
    });

    // Reveal Answer Mutation
    const revealAnswerMutation = useMutation({
        mutationFn: () => kbc.event_apis.revealEventQuestionAnswer(`id=${event_id}`),
        onSuccess: (res) => {
            toast.success(res.message || 'Answer revealed successfully');
            queryClient.invalidateQueries({ queryKey: ['eventDetails'] });
        },
        onError: (e: any) => {
            toast.error(e?.response?.data?.message || e.message || 'Failed to reveal answer');
        }
    });

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

  

    if (eventDetails.isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600">Loading event details...</p>
                </div>
            </div>
        );
    }

    if (eventDetails.error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-red-600">Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">Failed to load event details. Please try again later.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const event = eventDetails.data?.event;

    if (!event) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Event Not Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">The requested event could not be found.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Back Button and Actions Header */}
            <div className="flex items-center justify-between mb-6">
                <Button
                    variant="outline"
                    onClick={() => navigate('/event-management/events')}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Events
                </Button>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                    {/* Toggle Status */}
                    <Button variant={event.is_active ? "destructive" : "default"} size="sm" onClick={() => toggleStatusMutation.mutate(event.is_active ? 'inactive' : 'active')} disabled={toggleStatusMutation.isPending}>
                        {toggleStatusMutation.isPending ? (<Loader2 className="size-3 mr-1 animate-spin" />) : event.is_active 
                            ? (<><Pause className="size-3 mr-1" />Stop</>) 
                            : (<><Play className="size-3 mr-1" />Start</>)}
                    </Button>

                    {/* Lock/Unlock Question */}
                    {toggleLockMutation.isPending ? (
                        <Button variant="outline" size="sm" disabled>
                            <Loader2 className="size-3 mr-1 animate-spin" />
                            {event.is_locked ? 'Unlocking...' : 'Locking...'}
                        </Button>
                    ) : (
                        <Button variant="outline" size="sm" onClick={() => toggleLockMutation.mutate(event.is_locked ? 'unlocked' : 'locked')} disabled={toggleLockMutation.isPending}>
                            {event.is_locked ? (<><Unlock className="size-3 mr-1" />Unlock</>) : (<><Lock className="size-3 mr-1" />Lock</>)}
                        </Button>
                    )}
                    {/* Reveal Answer */}
                    <Button variant="outline" size="sm" onClick={() => revealAnswerMutation.mutate()} disabled={revealAnswerMutation.isPending || event.answer_reveal} className={event.answer_reveal ? "opacity-50 cursor-not-allowed" : ""}>
                        {revealAnswerMutation.isPending ? (<Loader2 className="size-3 mr-1 animate-spin" />) : (<><Eye className="size-3 mr-1" />Reveal Answer</>)}
                    </Button>
                    <ShowResultDialog event={event} />


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
            </div>

            {/* Event Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                            {event.name}
                            <LockStatusBadge
                                isLocked={event.is_locked}
                                isPending={toggleLockMutation.isPending}
                            />
                        </h1>
                        <p className="text-lg text-gray-600">{event.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Badge variant={event.is_active ? "default" : "secondary"} className="text-sm">
                            {event.is_active ? "Active" : "Inactive"}
                        </Badge>
                        {event.answer_reveal && (
                            <Badge variant="outline" className="text-sm bg-green-100 text-green-800">
                                Answer Revealed
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Event Details Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                        <CardContent className="flex items-center p-4">
                            <CalendarDays className="h-8 w-8 text-blue-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Start Time</p>
                                <p className="text-sm text-gray-900">{formatDateTime(event.start_time)}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center p-4">
                            <Clock className="h-8 w-8 text-green-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">End Time</p>
                                <p className="text-sm text-gray-900">{formatDateTime(event.end_time)}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center p-4">
                            <HelpCircle className="h-8 w-8 text-purple-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Questions</p>
                                <p className="text-sm text-gray-900">{event.questions.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            

            {/* Event Settings */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        Event Settings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-500">Answer Reveal</p>
                            <Badge variant={event.answer_reveal ? "default" : "secondary"} className="mt-1">
                                {event.answer_reveal ? "Enabled" : "Disabled"}
                            </Badge>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-500">Event Status</p>
                            <Badge variant={event.is_active ? "default" : "secondary"} className="mt-1">
                                {event.is_active ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-500">Lock Status</p>
                            <Badge variant={event.is_locked ? "destructive" : "default"} className="mt-1">
                                {event.is_locked ? "Locked" : "Unlocked"}
                            </Badge>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-500">Question Duration</p>
                            <p className="text-sm font-semibold text-gray-900 mt-1">
                                {event.question_duration ? `${event.question_duration}s` : "Not set"}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Separator className="my-6" />
            <ViewEventQuestionSection event={event} />
        </div>
    );
}

