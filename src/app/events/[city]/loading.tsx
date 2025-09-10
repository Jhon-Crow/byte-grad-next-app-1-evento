import React from 'react';
import Skeleton from "@/components/skeleton";
import SkeletonCard from "@/components/skeleton-card";

function Loading() {
    return (
        <div className={'flex flex-wrap max-w-[1100px] mx-auto px-[20px] py-24 gap-20 justify-center'}>
            {Array.from({length: 6}).map((item, index) => <SkeletonCard key={index}/>)}
        </div>
    );
}

export default Loading;