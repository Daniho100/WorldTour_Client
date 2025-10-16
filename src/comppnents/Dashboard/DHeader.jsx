import React from 'react'
import assets from '../../assets/assets';

const Dheader = () => {
  return (
    <div>
      <nav className="flex justify-between items-center py-2 px-3 sm:px-16 border-b-2 border-gray-300">
        <img className='w-[70.79px] sm:w-[106.5px] my-3 cursor-pointer' src={assets.logo} alt="" />

        <div className='flex justify-between gap-5 sm:gap-20'>
          <div className='flex gap-4 sm:gap-8'>
            <img className='w-4 sm:w-6 cursor-pointer' src={assets.alertIcon} alt="" />
            <hr className='h-10 border border-gray-300'/>
            <img className='w-4 sm:w-6 cursor-pointer' src={assets.email2} alt="" />
            <hr className='hidden sm:block h-10 border border-gray-300'/>
            <img className='hidden sm:block w-5 sm:w-6 cursor-pointer' src={assets.questionIcon} alt="" />
          </div>

          <div className='flex items-center shrink-0'>
            <img className='hidden sm:block w-12 cursor-pointer' src={assets.profileIcon} alt="" />
            <p className='hidden sm:block'>Super Admin</p>
            <img className='sm:hidden w-4 cursor-pointer' src={assets.hamburger} alt="" />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Dheader
