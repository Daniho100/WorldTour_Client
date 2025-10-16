import React from 'react'

const PrimaryBtn = ({text1}) => {
  return (
    <div className='my-6'>
      <button className="bg-primary border-2 border-primary text-white px-8 py-[10px] sm:px-[71px] text-sm sm:text-base rounded-md transition text-center">{text1}</button>

    </div>
  )
}

export default PrimaryBtn
