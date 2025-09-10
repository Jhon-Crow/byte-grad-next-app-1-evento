import React from 'react';
import EventCard from "@/components/event-card";
import PaginationControls from "@/components/pagination-controls";
import {getEvents} from "@/lib/server-utils";

async function EventsList({city, page=1}: { city: string, page?: number }) {
    const {events, totalEventsCount: totalEvents} = await getEvents(city, page);

    const previousPage = page > 1 ? `/events/${city}?page=${page - 1}` : '';
    const nextPage = page < Math.ceil(totalEvents / 6) ? `/events/${city}?page=${page + 1}` : '';
    return (
        <section className={'max-w-[1100px] flex flex-wrap gap-10 justify-center px-[20px]'}>
            {events.length ?
                (events.map(event => (<EventCard event={event} key={event.id}/>)))
                : <h2>Nothing :'(</h2>}
            <PaginationControls previousPage={previousPage} nextPage={nextPage}/>
        </section>
    );
}


export default EventsList;