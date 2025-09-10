import React from 'react';
import {cn} from "@/lib/utils";

function Skeleton({className}: { className?: string }) {
    return (
        <div className={cn('animate-pulse h-4 w-[550px] rounded-md bg-white/5', className)}/>
    );
}

export default Skeleton;