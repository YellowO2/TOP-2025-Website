"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { HiMenu } from "react-icons/hi";

function Navbar() {
  const [sideOpen, setSideOpen] = useState(false);

  function handleMenu() {
    setSideOpen(!sideOpen);
  }

  return (
    <div className='fixed flex'>
      <div className='bg-background hidden md:flex w-screen h-28 items-center justify-between px-24'>
        <div>MAIN LOGO</div>
        <ul className='flex gap-10'>
          <li><Link href='/' className='flex navbaritem'>TABTITLE</Link></li>
          <li><Link href='/' className='flex navbaritem'>TABTITLE</Link></li>
          <li><Link href='/' className='flex navbaritem'>TABTITLE</Link></li>
          <li><Link href='/' className='flex navbaritem'>TABTITLE</Link></li>
        </ul>
      </div>
      <div className='bg-background md:hidden flex w-screen h-24 items-center justify-start px-8'>
        <button onClick={handleMenu} className='z-20'>
          <HiMenu size={30} className={`${sideOpen ? "text-background" : "text-text"
            }`} />
        </button>
        <div
          className={`absolute top-0 left-0 h-screen justify-center flex text-background w-[70%] bg-primary z-10 transform ${sideOpen ? "translate-x-0" : "-translate-x-[100vw]"
            } transition-transform duration-300 ease-in-out`}
        >
          <ul className='flex flex-col gap-10 py-28'>
            <li><Link href='/' className='flex sidebaritem'>TABTITLE</Link></li>
            <li><Link href='/' className='flex sidebaritem'>TABTITLE</Link></li>
            <li><Link href='/' className='flex sidebaritem'>TABTITLE</Link></li>
            <li><Link href='/' className='flex sidebaritem'>TABTITLE</Link></li>
          </ul>

        </div>
      </div>
    </div>
  )
}

export default Navbar