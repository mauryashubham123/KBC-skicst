import { kbc } from "@/lib/helpers/api_urls";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { EventHeader } from "./PublicEvent/component/Headerpage";
import WaitingIllustration from "@/components/waiting-Illustration";
import { EventQuestionShow } from "./PublicEvent/component/events-question-show";
import EventScoreDisplay from "./PublicEvent/component/event-score-display";

export const MainEventsPage = () => {
    const counterRef = useRef(0);
    const { pathname } = useLocation();
    const event_id = pathname.split('/').pop();
    const eventUpdates = useQuery({
        queryKey: ['eventUpdate', event_id],
        queryFn: () => kbc.audiance_apis.getEventUpdates(`event_id=${event_id}&since=${Date.now()}&counter=${counterRef.current}`),
        staleTime: Infinity,
    });
    useEffect(() => {
        if (eventUpdates.data) {
            if (eventUpdates.data.data.event) {
                counterRef.current++;
            }
            eventUpdates.refetch();
        }
    }, [eventUpdates.data]);
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-4">
                <div className="">
                     <EventHeader event={eventUpdates.data?.data?.event} />
                     {
                        !eventUpdates.data?.data?.event?.is_active ?
                            <WaitingIllustration  event={eventUpdates.data?.data?.event} />
                        :
                        eventUpdates.data?.data?.answers 
                        ? <EventScoreDisplay event={eventUpdates.data?.data?.event} userAnswers={eventUpdates.data?.data?.answers} isLoading={eventUpdates.isLoading} />
                        : <EventQuestionShow eventData={eventUpdates} />
                     }

                </div>
            </div>
        </>
    )
}

