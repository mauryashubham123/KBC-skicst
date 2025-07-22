import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { kbc } from "@/lib/helpers/api_urls";
import { KbcEventType } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusCircle } from "lucide-react";
import React, { FormEvent, ReactNode, useState } from "react";
import { toast } from "sonner";

interface CreateEventDialogProps {
    defaultEvent?: KbcEventType;
    children?: ReactNode;
}

const CreateEventDialog: React.FC<CreateEventDialogProps> = ({ defaultEvent, children }) => {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const eventMutation = useMutation({
        mutationFn: (data: FormData) => 
            // defaultEvent 
            //     ? kbc.event_apis.updateEvent(data, defaultEvent.id) 
            //     : 
                kbc.event_apis.createEvent(data),
        onSuccess: (res:any) => {
            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ['events'] });
            setOpen(false);
        },
        onError: (e: any) => toast.error(e?.response?.data?.message || e.message)
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        eventMutation.mutate(formData);
    };

    // Format datetime for input (convert from backend format to input format)
    const formatDateTimeForInput = (dateString: string | undefined) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        // Format as YYYY-MM-DDTHH:MM (datetime-local input format)
        return date.toISOString().slice(0, 16);
    };

    return (
        <Dialog open={eventMutation.isPending || open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ? children :
                    <Button className="flex gap-2">
                        <PlusCircle className="size-4 inline" />
                        <span className="hidden md:inline">
                            {defaultEvent ? 'Update Event' : 'Add New Event'}
                        </span>
                    </Button>
                }
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {defaultEvent ? 'Update Event' : 'Create New Event'}
                    </DialogTitle>
                    <DialogDescription>
                        {defaultEvent 
                            ? 'Update the event details and click save to apply changes.'
                            : 'Enter the details for the new KBC event. Click save when you\'re done.'
                        }
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="grid gap-4">
                        {/* Event Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">
                                Event Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                disabled={eventMutation.isPending}
                                defaultValue={defaultEvent?.name || ''}
                                name="name"
                                id="name"
                                placeholder="Enter event name"
                                required
                            />
                        </div>

                        {/* Event Description */}
                        <div className="grid gap-2">
                            <Label htmlFor="description">
                                Description <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                                disabled={eventMutation.isPending}
                                defaultValue={defaultEvent?.description || ''}
                                name="description"
                                id="description"
                                placeholder="Enter event description"
                                rows={3}
                                required
                            />
                        </div>

                        {/* Start and End Time */}
                        <div className="grid gap-4 grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="start_time">
                                    Start Time <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    disabled={eventMutation.isPending}
                                    defaultValue={formatDateTimeForInput(defaultEvent?.start_time)}
                                    name="start_time"
                                    id="start_time"
                                    type="datetime-local"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="end_time">
                                    End Time <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    disabled={eventMutation.isPending}
                                    defaultValue={formatDateTimeForInput(defaultEvent?.end_time)}
                                    name="end_time"
                                    id="end_time"
                                    type="datetime-local"
                                    required
                                />
                            </div>
                        </div>

                        {/* Question Duration */}
                        {/* <div className="grid gap-2">
                            <Label htmlFor="question_duration">
                                Question Duration <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                disabled={eventMutation.isPending}
                                defaultValue={defaultEvent?.question_duration || '00:01:00'}
                                name="question_duration"
                                id="question_duration"
                                type="time"
                                step="1"
                                placeholder="HH:MM:SS"
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                Duration for each question (format: HH:MM:SS)
                            </p>
                        </div> */}

                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary">Cancel</Button>
                            </DialogClose>
                            <Button disabled={eventMutation.isPending} type="submit">
                                {eventMutation.isPending && (
                                    <Loader2 className="animate-spin inline size-4 mr-2" />
                                )}
                                {defaultEvent ? 'Update' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateEventDialog;