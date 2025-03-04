'use client'
import Image from 'next/image';
export default function Home() {
    return (

        <div className='w-full h-screen flex px-8 pb-8 md:px-20 md:pb-12'>
            <div className='flex w-full h-full rounded-b-3xl md:rounded-b-[60px] overflow-hidden'>
                <Image
                    src='/images/bg.png'
                    width={1920}
                    height={1080}
                    alt='Background'
                    quality={100}
                    className='object-cover object-left md:object-bottom'
                />
            </div>
            <div className='absolute z-20 left-0 right-0 h-full flex items-center justify-center flex-col'>
                <Image
                    src='/images/tele.png'
                    width={1080}
                    height={1080}
                    alt='Telegram Icon'
                    quality={100}
                    className='flex w-16 z-10 mb-4'
                />
                <div className='flex text-sm mb-2'>to play, join our</div>
                <a
                    href="https://t.me/+sPK3pU4QXmdkNjg1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex text-[32px] cursor-pointer md:w-[20vw] px-32 text-center items-center justify-center leading-8 hover:underline"
                >
                    telegram channel
                </a>

            </div>
        </div>
    );
}