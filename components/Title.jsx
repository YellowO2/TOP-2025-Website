import React from 'react'
import { BiSolidChevronRight } from "react-icons/bi";

function Title() {
  return (
    <div className='flex w-full h-screen justify-center items-center flex-col pt-20'>
      <div className='flex text-center align-middle title mb-10 md:mb-14'>CCDS top</div>
      <div className='flex w-1/2 md:w-1/3 lg:w-1/4 lg:text-base text-center mb-6'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Ut vulputate mauris sed quam tempus scelerisque.
      </div>
      <button className='flex button1'>
        Button
        <BiSolidChevronRight size={20} className='ml-2 inline'/>
      </button>
    </div>
  )
}

export default Title