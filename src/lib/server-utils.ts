import 'server-only';
import {unstable_cache} from "next/cache";
import {notFound} from "next/navigation";
import {capitalize} from "@/lib/utils";
import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient();

export const getEvents = unstable_cache(async (city: string, page = 1) => {
    const events = await prisma.eventoEvent.findMany({
        where: {city: city === 'all' ? undefined : capitalize(city)},
        orderBy: {date: 'asc'},
        take: 6,
        skip: (page - 1) * 6
    });
    const totalEventsCount = await prisma.eventoEvent.count({where: {city: city === 'all' ? undefined : capitalize(city)}});
    return {events, totalEventsCount};
});

export const getEvent = unstable_cache(async (slug: string) => {
    const eventoEvent = await prisma.eventoEvent.findUnique({where: {slug}});
    if (!eventoEvent) return notFound();
    return eventoEvent;
});
