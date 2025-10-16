import assets from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col bg-white pt-5'>
      <div className='flex flex-col gap-2 sm:flex-row justify-between items-center my-1 mx-3 sm:my-2 sm:mx-16'>

        {/* ---- left side ---- */}
        <div className='flex flex-col gap-6 justify-center items-center sm:items-start mb-5 sm:m-0'>
          <img className='w-[71px] sm:w-[106.5px]' src={assets.logo} alt="" />
          <div className='flex flex-col gap-2 text-xs sm:text-sm items-center sm:items-start'>
            <p className='flex flex-row gap-2'>
              <img src={assets.call} alt="" />
              <span className=''>{'('}01{')'} 2918853</span>
              <span className=''>{'('}01{')'} 2918854</span>
              <span className=''>{'('}01{')'} 2918827</span>
            </p>
            <p className='flex flex-row gap-4'><img src={assets.email} alt="" />info@iginigeria.com</p>
          </div>
        </div>

        {/* ---- right sid  qe ---- */}
        <div className='flex flex-1 items-center justify-center '>
          <div className='text-xs sm:text-sm text-center sm:text-left flex flex-col gap-3'>
            <p><span className='font-bold text-[#848484] mr-3'>Registered Office:</span>Plot 741, Adeola Hopewell Street, Victoria Island, Lagos, Nigeria.</p>
            <p><span className='font-bold text-[#848484] mr-3'>Head Office {'('}IGI House{')'}:</span>No 2, Agoro Odiyan, off Adeola Odeku, Victoria Island, Lagos, Nigeria.</p>
            <p><span className='font-bold text-[#848484] mr-3'>Head Office {'('}Annex{')'}:</span>Plot 758, Cadastral Zone AD, Central Business District, Abuja, Nigeria.</p>
          </div>
        </div>
      </div>

      {/* ---- Copyupright ---- */}
      <div className='bg-primary text-white text-center text-[8px] sm:text-sm py-3 sm:py-5 mt-6 sm:mt-10'> &copy;  {new Date().getFullYear()} Industrial & General Insurance Plc {'('}IGI{')'}. All rights reserved.</div>
    </div>
  )
}

export default Footer


