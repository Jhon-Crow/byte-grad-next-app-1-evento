import H1 from "@/components/h1";
import EventsList from "@/components/events-list";
import {Suspense} from "react";
import Loading from "@/app/events/[city]/loading";
import {capitalize} from "@/lib/utils";
import {z} from "zod";

type Props = {
    params: Promise<{ city: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

export async function generateMetadata({params}: Props) {
    const {city} = await params;

    return {
        title: city === 'all' ? 'All Events' : `Events in ${capitalize(city)}`,
    };
}

const pageNumberSchema = z.coerce.number().positive().optional();
export default async function EventsPage({params, searchParams}: Props) {
    const {city} = await params;
    // @ts-ignore
    const parsedPage = pageNumberSchema.safeParse(await searchParams?.page);
    if (!parsedPage.success) {
        throw new Error('Invalid page number');
    }
    return (
        <main className={'flex flex-col items-center py-24 px-[1.25rem] min-h-[110vh]'}>
            <H1 className={'mb-28'}>{city === 'all' ? 'All Events' : `Events in ${capitalize(city)}`}</H1>
            <Suspense key={city + parsedPage.data} fallback={<Loading/>}>
                <EventsList city={city} page={parsedPage.data}/>
            </Suspense>
        </main>
    );
};