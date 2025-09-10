import React from 'react';
import Link from "next/link";
import {ArrowLeftIcon, ArrowRightIcon} from "@radix-ui/react-icons";

const btnStyle = 'text-white px-5 py-3 bg-white/5 rounded-md opacity-75 flex items-center gap-x-2 hover:opacity-100 transition text-sm ';
export default function PaginationControls({previousPage, nextPage}: { previousPage: string, nextPage: string }) {
    return (
        <section className={'flex justify-between w-full'}>
            {previousPage ? <Link className={btnStyle} href={previousPage}><ArrowLeftIcon/> Prev</Link> : <div/>}
            {nextPage ? <Link className={btnStyle} href={nextPage}>Next <ArrowRightIcon/></Link> : <div/>}
        </section>
    );
}
