'use client'
// import Logo from '../Logo'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import Link from 'next/link'
import Image from 'next/image'

function Footer() {
    return (
        <div className='flex flex-col w-full min-h-[45vh] px-12 md:px-20 py-12 border-t border-white/10'>
            {/* top section */}
            <div className='flex flex-col md:flex-row pb-12 justify-start md:justify-between border-b border-white/10 grow-8'>
                {/* logo section */}
                <div className='flex flex-col justify-start items-start mb-4 font-homevideo font-bold tracking-tight text-xl text-white/25'>
                    <Image
                        src="/og-logos/1.svg"
                        alt="Logo"
                        width={60}
                        height={60}
                    />

                </div>

                {/* links section */}
                <div className='flex flex-col md:flex-row gap-6 md:gap-28 mx-2'>
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-3'>
                            <div className='uppercase tracking-wide font-semibold'>Legal</div>
                            <Link href='/' className='footerLink'>Terms & Conditions</Link>
                            <Link href='/' className='footerLink'>Privacy Policy</Link>
                        </div>

                    </div>

                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-3'>
                            <div className='uppercase tracking-wide font-semibold'>Contact Us</div>
                            <Link href='mailto:fixittoday.contact@gmail.com' className='footerLink'>
                                <HiOutlineMail size={16} className='flex' /> Email
                            </Link>
                            <Link href='https://instagram.com' target="_blank" rel="noopener noreferrer" className='footerLink'>
                                <FaInstagram size={16} className='flex' /> Instagram
                            </Link>
                            <Link href='https://whatsapp.com' target="_blank" rel="noopener noreferrer" className='footerLink'>
                                <FaWhatsapp size={16} className='flex' /> Whatsapp
                            </Link>
                            {/* <Link href='https://telegram.org' target="_blank" rel="noopener noreferrer" className='footerLink'>
                                <FaTelegram size={16} className='flex' /> Telegram
                            </Link>
                            <Link href='https://telegram.org' target="_blank" rel="noopener noreferrer" className='footerLink'>
                                <FaFacebook size={16} className='flex' /> Facebook
                            </Link>
                             <Link href='https://telegram.org' target="_blank" rel="noopener noreferrer" className='footerLink'>
                                <FaLinkedin size={16} className='flex' /> Linkedin
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* bottom section */}
            <div className='flex flex-col md:flex-row pt-6 justify-between items-center text-xs  text-center'>
                {/* <div className='flex tracking-tight'>
                    <span className='opacity-60'>Website created by</span> <a href="https://www.linkedin.com/in/sabaxazad/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity ease-in-out duration-300 ml-1">Saba Azad</a>
                </div> */}
                <div className='flex tracking-tight opacity-60'>
                    © 2025 CCDS Top. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Footer