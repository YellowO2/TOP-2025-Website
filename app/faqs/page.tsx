'use client'
import React from 'react'
import { LuPlus } from 'react-icons/lu'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image';
import { faqItems } from '../../lib/constants/faqItems';


function FAQs() {
    const [openedDrawer, setOpenedDrawer] = React.useState<number>(-1);

    const handleOpen = (idx: number) => {
        setOpenedDrawer(openedDrawer === idx ? -1 : idx);
    }

    return (
        <div className='flex relative items-center justify-center  w-full border-white/10 pb-24 md:pb-48 flex-col'>
            <div className="flex w-full h-[300px] relative pointer-events-none">
                <Image
                    src="/faqs-about-us/img3.png"
                    alt="Game 1"
                    fill
                    className="object-cover [mask-image:linear-gradient(to_bottom,white,white_40%,transparent_95%)]"
                    quality={100}
                    style={{ objectPosition: 'center 35%' }}
                />
            </div>
            <div className='flex flex-col  w-full transition-all ease-in-out duration-300 px-12 md:px-24'>

                <h1 className='flex my-8 font-bold font-homevideo'>
                    FAQs
                </h1>
                <div className='flex flex-col mt-8 w-full'>
                    {faqItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <div className="w-full">
                                <div
                                    className='flex flex-row justify-between items-center px-2 w-full cursor-pointer text-base'
                                    onClick={() => handleOpen(index)}
                                >
                                    <span>{item.question}</span>
                                    <LuPlus
                                        size={20}
                                        className={`transition-all ease-in-out duration-300 ${openedDrawer === index ? 'rotate-45' : 'rotate-0'
                                            }`}
                                    />
                                </div>

                                <AnimatePresence>
                                    {openedDrawer === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-2 py-4 text-sm text-white/70" dangerouslySetInnerHTML={{ __html: item.answer }} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {index < faqItems.length - 1 && (
                                <div className='border-t border-white/10 my-4' />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FAQs