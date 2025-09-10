'use client'
import React, {useRef} from 'react';
import Image from "next/image";
import Link from "next/link";
import {motion, useScroll, useTransform} from "framer-motion";
import {EventoEvent} from ".prisma/client";

const MotionLink = motion(Link);

function EventCard({event}: { event: EventoEvent }) {
    const ref = useRef(null);
    const {scrollYProgress} = useScroll({
        // @ts-ignore
        target: ref,
        offset: ["0 1", "1.5 1"],
    });
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
    const data = new Date(event.date);

    return (
        <MotionLink
            initial={{
                scale: 0.8,
                opacity: 0,
            }}
            style={{
            // @ts-ignore
            scale: scaleProgress,
            // @ts-ignore
            opacity: opacityProgress
        }} ref={ref} href={`/event/${event.slug}`} className={'flex-1 basis-80 h-[380px] max-w-[500px]'}>
            <section className={'w-full' +
                ' h-full flex-col flex state-effects ' +
                ' rounded-xl overflow-hidden' +
                ' bg-white/[3%] relative '}>
                <Image className={'h-[60%] object-cover'} src={event.imageUrl} alt={event.name} width={500}
                       height={280}/>
                <div className={'flex flex-col flex-1 justify-center items-center'}>
                    <h2 className={'text-2xl font-semibold'}>{event.name}</h2>
                    <p className={'italic text-white/75'}>By {event.organizerName}</p>
                    <p className={'text-sm text-white/50 mt-4'}>{event.location}</p>
                </div>
                <section
                    className={'rounded-md absolute left-[12px] flex justify-center items-center flex-col top-[12px]' +
                        ' h-[45px] w-[45px] bg-black/30'}>
                    <p className={'text-xl -mb-[5px] font-bold'}>{data.toLocaleDateString('ru-RU', {
                        day: '2-digit',
                    })}</p>
                    <p className={'text-xs uppercase text-accent'}>{data.toLocaleDateString('ru-RU', {
                        month: 'short',
                    })}</p>
                </section>
            </section>
        </MotionLink>
    );
}

export default EventCard;