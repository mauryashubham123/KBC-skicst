import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { kbc } from "@/lib/helpers/api_urls";
import { EventType } from "@/types/typedef";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { FolderOutput, AlertCircle } from "lucide-react";
import { useState } from "react";
import { UserDescriptionWithAvatar } from "@/components/Custom/user-short-description";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ShowResultDialog({ event }: { event: EventType }) {
    const [isOpen, setIsOpen] = useState(false);
    
    // Check if event is currently running or live
    const isEventRunning = event.is_live || 
        (new Date(event.start_time) <= new Date() && new Date() <= new Date(event.end_time));

    const mode1result = useQuery<any>({
        queryKey: ['mode1result', event.id],
        queryFn: () => kbc.event_apis.firstModeResult(event.id),
        staleTime: Infinity,
        select: (res) => res.data,
        enabled: isOpen && !isEventRunning // Only run query when modal is open and event is not running
    });

    const handleButtonClick = () => {
        if (isEventRunning) {
            // Don't open the modal, just show alert in the dialog content
            setIsOpen(true);
        } else {
            setIsOpen(true);
        }
    };
   

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    size="sm"
                    onClick={handleButtonClick}
                >
                    <FolderOutput className="size-3 mr-1" />
                    Result
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold text-lg">{event.name} Event Result</DialogTitle>
                    <DialogDescription>Select the Mode 1 or 2 to view the event result</DialogDescription>
                </DialogHeader>
                
                {isEventRunning ? (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            The event is still running in the time frame and is active. Results are not available yet.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <Tabs defaultValue="mode1">
                        <TabsList className="w-full">
                            <TabsTrigger className="w-full" value="mode1">Mode 1</TabsTrigger>
                            <TabsTrigger className="w-full" value="mode2">Mode 2</TabsTrigger>
                        </TabsList>
                        <TabsContent value="mode1">
                            {mode1result.isLoading ? (
                                <p>Loading results...</p>
                            ) : mode1result.error ? (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        Error loading Mode 1 results. Please try again.
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <div className="h-96 overflow-y-auto">
                                   {mode1result.data && mode1result.data?.event?.result.map((r:any)=>{
                                       return (
                                            <Card className="mb-2">
                                                <CardHeader className="flex justify-between gap-2">
                                                    <UserDescriptionWithAvatar user={r.user} />
                                                </CardHeader>
                                                <CardContent className="flex gap-2">
                                                    <Badge variant={'outline'} className="w-fit">Score : {r.score}</Badge>
                                                    <Badge variant={'outline'} className="w-fit">Time Score : {r.time_remaining}</Badge>
                                                    <Badge className="w-fit">Final Score : {r.score * r.time_remaining}</Badge>
                                                </CardContent>
                                            </Card>
                                       );
                                   })}
                                    
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="mode2">
                            <p>Mode 2 result</p>
                        </TabsContent>
                    </Tabs>
                )}
            </DialogContent>
        </Dialog>
    );
}