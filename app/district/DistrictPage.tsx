'use client';

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OG_INFO } from "../lib/constants/oginfo";

interface SubOG {
    name: string;
    itemCount: number;
    lastItemEarnedAt: string;
    items: Record<string, number>;
}

function District() {
    const searchParams = useSearchParams();
    const district = searchParams.get("district");
    const router = useRouter();
    const [subOGs, setSubOGs] = useState<SubOG[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!district) {
            router.push("/");
            return;
        }
        setLoading(true);
        fetch(`/api/district?og=${encodeURIComponent(district)}`)
            .then(res => res.json())
            .then(data => {
                setSubOGs(data.subOGs || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [district, router]);

    if (!district) {
        return <div className="flex w-full h-screen" />;
    }
    const ogInfo = OG_INFO.find(info => info.district === district);

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full h-[300px] relative">
                <Image
                    src={ogInfo?.logo || "/default-district-image.jpg"}
                    alt="Game 1"
                    fill
                    className="object-cover [mask-image:linear-gradient(to_bottom,white,white_40%,transparent_95%)] opacity-20"
                    quality={100}
                    priority
                    style={{ objectPosition: 'center' }}
                />
            </div>
            <div className="flex flex-col gap-5 items-center w-full h-full px-8 md:px-24 pt-12 pb-24">
                <div className="flex px-3 py-1 rounded-full border border-white/20">
                    {ogInfo?.district || "District Not Found"}
                </div>
                <div className="h-fit flex">
                    <h1 className="font-homevideo font-bold tracking-tight text-center">
                        {ogInfo?.name || "N/A"}
                    </h1>
                </div>
                <div className="flex text-center font-light">
                    View all your district&apos;s resources and statistics on this page.
                </div>
                <p className="flex text-pretty my-8 text-sm w-full">
                    {ogInfo?.description || "No description available."}
                </p>

                {loading ? (
                    <div className="w-full flex items-center justify-center py-12">Loading...</div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-x-12 gap-y-4 w-full mb-12'>
                        {subOGs.map((subog, idx) => (
                            <div key={idx} className='flex items-center flex-row gap-6 w-full'>
                                <div className='flex flex-col'>
                                    <p className='flex font-semibold text-lg'>{subog.name}</p>
                                    {Object.entries(subog.items).map(([itemName, amount]) => (
                                        <p className='font-light' key={itemName}>
                                            {itemName}: {amount}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default District;