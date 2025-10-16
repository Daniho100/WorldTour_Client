import React from 'react'

const SecondaryBtn = ({text1, onClick}) => {
  return (
    <div className='my-6'>
      <button onClick={onClick} className="bg-transparent border-2 border-white text-white px-[61px] py-[10px] sm:px-[71px] text-sm sm:text-base rounded-md hover:bg-white hover:text-black transition">{text1}</button>
    </div>
  )
}

export default SecondaryBtn
