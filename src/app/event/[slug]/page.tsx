import Image from "next/image";
import H1 from "@/components/h1";
import {ReactNode} from "react";
import {Metadata} from "next";
import {getEvent} from "@/lib/server-utils";

type Props = {
    params: { slug: string }
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {slug} = params;
    const eventoEvent = await getEvent(slug);

    return {
        title: eventoEvent.name,
    };
}

export async function generateStaticParams() {
    return [
        {slug: 'Very cool'},
        {slug: 'Masqurade'},
        {slug: 'Fire show'}
    ]
}
export default async function EventPage({params}: Props) {
    const {slug} = params;
    const eventoEvent = await getEvent(slug);
    const date = new Date(eventoEvent.date);
    return (
        <main>
            <section className={'relative py-14 md:py-20 flex items-center justify-center'}>
                <Image
                    className={'object-cover z-0 blur-3xl'}
                    quality={50}
                    priority
                    src={eventoEvent.imageUrl}
                    alt={'Event background image'}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                />
                <div className={'z-1 relative flex gap-6 lg:gap-16 lg:flex-row flex-col'}>
                    <Image src={eventoEvent.imageUrl} alt={eventoEvent.name}
                           className={'rounded-xl border-2 border-white/50 object-cover'}
                           width={300}
                           height={201}
                    />
                    <div className={'flex flex-col'}>
                        <p className='text-white/75'>{date.toLocaleDateString(
                            "ru-RU", {
                                weekday: "long",
                                month: "long",
                                day: "numeric"
                            }
                        )}</p>
                        <H1 className={'mb-2 mt-1 whitespace-nowrap lg:text-5xl'}>{eventoEvent.name}</H1>
                        <p className={'whitespace-nowrap text-xl text-white/75'}>
                            Organized by <span className="italic">
                            {eventoEvent.organizerName}
                            </span>
                        </p>
                        <button
                            className={'bg-white/20 mt-5 text-lg capitalize bg-blur lg:mt-auto state-effects w-[95vw] rounded-md border-white/10 border-2 py-2'}
                        >Get tickets
                        </button>
                    </div>
                </div>
            </section>
            <div className={'min-h-[75vh] text-center px-5 py-16'}>
                <Section>
                    <SectionHeading>About this event</SectionHeading>
                    <SectionContent>{eventoEvent.description}</SectionContent>
                </Section>
                <Section>
                    <SectionHeading>Location</SectionHeading>
                    <SectionContent>{eventoEvent.location}</SectionContent>
                </Section>
            </div>
        </main>
    );
};

function Section({children}: { children: ReactNode }) {
    return <section className={'mb-12'}>{children}</section>
}

function SectionHeading({children}: { children: ReactNode }) {
    return <h2 className={'text-2xl mb-8 '}>{children}</h2>

}

function SectionContent({children}: { children: ReactNode }) {
    return <p className={'max-w-4xl mx-auto text-lg leading-8 text-white/75'}>
        {children}
    </p>
}
