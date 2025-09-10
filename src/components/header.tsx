'use client'
import {motion} from "framer-motion";
import React from 'react';
import Link from "next/link";
import Logo from "@/components/logo";
import {usePathname} from "next/navigation";
import clsx from "clsx";
import {cn} from "@/lib/utils";

const routes= [
    {name: 'Home', path: '/'},
    {name: 'All Events', path: '/events/all'},
]

function Header() {
    const activePathname = usePathname();
    return (
        <header className='flex items-center justify-between border-b border-white/10 h-14 px-4 sm:px-9'>
            <Logo/>
            <nav className={'h-full'}>
            <ul className='flex gap-x-6 text-sm h-full'>
                {routes.map(rout => (
                    <li key={rout.path} className={ cn(  'hover:text-white transition relative flex items-center', {
                        'text-white/50': activePathname !== rout.path,
                        'text=white': activePathname === rout.path,
                    } ) }>
                        <Link href={rout.path}>{rout.name}</Link>
                        { activePathname === rout.path && ( <motion.div layoutId={'header-active-link'} className={'bg-accent h-1 w-full absolute bottom-0'}></motion.div> ) }
                    </li>
                ))}
            </ul>
            </nav>
        </header>
    );
}

export default Header;