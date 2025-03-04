"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { HiMenu } from "react-icons/hi";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { TiChevronRightOutline } from "react-icons/ti";

function Navbar() {
  const [sideOpen, setSideOpen] = useState(false);

  function handleSideMenu() {
    setSideOpen(!sideOpen);
  }

  return (
    <div className='flex'>

      <div className={`fixed flex justify-center z-40 top-0 left-0 rounded-r-3xl h-screen w-screen md:w-[30vw] lg:w-[16vw] bg-black/90 md:bg-black/80 backdrop-blur-sm transition-transform duration-300 ${sideOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='flex flex-col w-full h-full pt-32 pb-10 md:py-12 px-3 justify-between'>
          <div className='flex w-full px-10 md:px-4 flex-col'>
            <div className='text-[40px] md:text-3xl font-home tracking-[-1px] mb-16 md:mb-4'>
              WELCOME
            </div>
            <ul className='flex flex-col gap-2 mb-8'>
              <li className='flex gap-2 items-center'><MdOutlineSubdirectoryArrowRight size={16} /> <Link href='/' className='regularLink'>About us</Link></li>
              <li className='flex gap-2 items-center'><MdOutlineSubdirectoryArrowRight size={16} /> <Link href='/leaderboard' className='regularLink'>Leaderboard</Link></li>
              <li className='flex gap-2 items-center'><MdOutlineSubdirectoryArrowRight size={16} /> <Link href='/' className='regularLink'>Blog</Link></li>
            </ul>
            <div className='text-3xl font-home tracking-[-1px] mb-4'>
              JOIN US
            </div>
            <ul className='flex flex-col gap-2 mb-8'>
              <li className='flex gap-2 items-center'><MdOutlineSubdirectoryArrowRight size={16} /> <Link href='/play' className='regularLinkRed'>Poker</Link></li>
              <li className='flex gap-2 items-center'><MdOutlineSubdirectoryArrowRight size={16} /> <Link href='/' className='regularLinkRed'>Subscribe</Link></li>
            </ul>
          </div>
          <div className='flex w-full px-10 md:px-4 flex-col'>
            <div className='text-3xl font-home tracking-[-1px] mb-4'>
              SOCIALS
            </div>
            <ul className='flex flex-col gap-2 mb-8'>
              <li className='flex gap-2 items-center'><MdOutlineSubdirectoryArrowRight size={16} /> <Link href='/' className='socialLink'>Instagram</Link></li>
              <li className='flex gap-2 items-center'><MdOutlineSubdirectoryArrowRight size={16} /> <Link href='/' className='socialLink'>Linkedin</Link></li>
              <li className='flex gap-2 items-center'><MdOutlineSubdirectoryArrowRight size={16} /> <Link href='/' className='socialLink'>Telegram</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <button 
        onClick={handleSideMenu} 
        className={`hidden md:flex fixed top-0 translate-y-10 left-[16vw] bg-black z-50 border rounded-md  hover:text-red-600  hover:border-red-600 transition ease-in-out duration-300  ${sideOpen ? 'rotate-180 lg:-translate-x-4 translate-x-28'  : '-translate-x-[12vw] rotate-0'}`}>
        <TiChevronRightOutline size={30} />
      </button>

      <div className='fixed md:hidden px-8 items-center flex w-screen h-[127px] z-50'>
        <button onClick={handleSideMenu}>
          <HiMenu size={30} className='flex bg-black'/>
        </button>
      </div>
    </div>
  )
}

export default Navbar;