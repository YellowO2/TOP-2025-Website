'use client'

import React from 'react'
import Image from 'next/image'

export default function About() {
  return (
    <div className="w-full h-screen flex px-8 pb-8 md:px-20 md:pb-12">
      <div className="flex w-full h-full rounded-b-3xl md:rounded-b-[60px] overflow-hidden">
        <Image
          src="/images/bg.png"
          width={1920}
          height={1080}
          alt="Background"
          quality={100}
          className="object-cover object-left md:object-bottom"
        />
      </div>
      <div className="absolute z-20 inset-0 flex items-center justify-center flex-col px-4">
        <h1 className="text-[24px] md:text-[54px] tracking-[-2px] text-white mb-6">
          ABOUT US
        </h1>
        <div className="w-[75vw] max-w-3xl space-y-6 text-center text-white text-lg md:text-xl">
          <p>
            Welcome to <strong>TOP Tech 2025</strong> — your one-stop tech hub for the SCDS
            “Alice in Borderland” orientation experience. We believe in harnessing the
            power of seamless, intuitive technology to bring you closer to every challenge,
            every card, and every teammate.
          </p>
          <p>
            Our mission is to make orientation not just an event, but a journey: one
            powered by clear schedules, real-time leaderboards, and instant updates
            straight to your phone. Whether you’re scanning in through QR codes,
            tracking your Sub-OG’s progress, or climbing the leaderboard, TOP Tech
            2025 has you covered.
          </p>
          <p>
            Thank you for joining us—let the games begin, and may the best OG win!
          </p>
        </div>
      </div>
    </div>
  )
}