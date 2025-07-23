import { kbc } from "@/lib/helpers/api_urls";
import { setBreadcrumb } from "@/redux/Features/uiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import EventCard from "./component/EventCard";


export const PublicEventPage = () => {
    const dispatch = useAppDispatch();


    const eventListQuery = useQuery<any, any,any>({
        queryKey: ['events'],
        queryFn: () => kbc.event_apis.getEventList(),
        select: (res) => res.data,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });

    useEffect(() => {
        dispatch(setBreadcrumb([
            { label: 'Dashboard', link: '/dashboard' },
        ]));
    }, []);

    return (
        <>

            {eventListQuery.data && eventListQuery.data.events.length > 0 && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
                    {eventListQuery.data.events.map((event:any) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </>
    )
}
