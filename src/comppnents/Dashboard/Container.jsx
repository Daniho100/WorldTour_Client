import assets from '../../assets/assets';
import Dropdown from './Dropdown';


const Container = () => {
  return (
    <div>
      <main className="flex-1 mt-0">
          <div className='mt-[40px] sm:ml-[40px] sm:mr-[64px] mx-3'>
            <div className='flex justify-between mb-8 gap-8 '>
              <h1 className='text-xl sm:text-2xl font-bold text-black'>Dashboard</h1>
              <p className='text-black font-bold text-sm sm:text-lg'>Goodafternoon, <span className='text-primary font-bold text-base sm:text-lg'>John</span></p>
            </div>

            <div className="flex flex-row flex-wrap gap-x-8 gap-y-6 sm:gap-y-12 w-full mb-16 sm:mb-0">
              {/* DashBoard Boxes */}
              {/* --- BOX 1 --- */}
              <div className="flex flex-col gap-14 justify-center items-center rounded-lg border border-gray3 p-6 w-[388px] h-[215px] grow">
                <div className="flex justify-between gap-2 items-center w-full">
                  <div className='flex gap-4 items-center mr-8 shrink'>
                    <img className='w-14' src={assets.policy2} alt="" />
                    <p className='font-bold text-black text-base'>Policies</p>
                  </div>
                  <div><Dropdown /></div>
                  {/* <img src={assets.plusIcon} alt="" /> */}
                </div>
                <div className='bg-primary2 flex flex-row flex-wrap justify-between items-center px-3 py-3.5  w-full rounded-md'>
                  <p className='text-xs font-medium text-accent whitespace-nowrap'>Total no. of Policies</p>
                  <p className='text-lg font-bold text-accent '>120</p>
                </div>
              </div>

              {/* --- BOX 2 --- */}
              <div className="relative flex flex-col shrink flex-wrap gap-14 justify-center items-center rounded-lg border border-gray3 p-6 w-[388px] h-[215px] grow">
                <div className='flex items-center justify-between w-full'>
                  <div className='flex justify-between items-center gap-4'>
                    <img className='w-14' src={assets.report2} alt="" />
                    <p className='font-bold text-black text-base'>Reports</p>
                  </div>
                  <img src={assets.dotdotdot} alt="" />
                </div>
                <div className='flex justify-between items-end w-full'>
                  <div className='flex flex-col gap-2 justify-center '>
                    <div className='flex items-center gap-3'>
                      <p className="w-[8px] h-[16px] bg-primary rounded-[2px]"></p>
                      <p className='text-xs font-medium text-accent'>Issued</p>
                    </div>
                    <div className='flex items-center gap-3'>
                      <p className="w-[8px] h-[16px] bg-gold rounded-[2px]"></p>
                      <p className='text-xs font-medium text-accent'>Cancelled</p>
                    </div>
                  </div>
                  <div className=''>
                    <img className='absolute bottom-0 right-6' src={assets.arc} alt="" />
                    <div className='absolute bottom-6 right-[50px] flex flex-col gap-3 items-center '>
                      <p className='font-bold text-lg text-accent'>235</p>
                      <p className='text-gray4 text-xs font-medium'>Total no. of Application</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* --- BOX 3 --- */}
              <div className="relative flex flex-col flex-shrink gap-[17px] justify-center items-center rounded-lg border border-gray3 p-6 w-[388px] h-[215px] grow">
                <div className='flex items-center justify-between w-full'>
                  <div className='flex justify-between items-center gap-4'>
                    <img className='w-14' src={assets.complaints} alt="" />
                    <p className='font-bold text-black text-base'>Complaints</p>
                  </div>
                  <img src={assets.dotdotdot} alt="" />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                  <div className='flex flex-row justify-between items-center p-2 px-3 w-full h-[45px] bg-primary2 rounded-[4px]'>
                      <p className='text-xs font-medium text-accent whitespace-nowrap'>Resolved Complaints</p>
                      <p className='text-lg font-bold text-accent '>300</p>
                  </div>
                  <div className='flex flex-row justify-between items-center p-2 px-3 w-full h-[45px] bg-gold2 rounded-[4px]'>
                  <p className='text-xs font-medium text-accent whitespace-nowrap'>Unresolved Complaints</p>
                  <p className='text-lg font-bold text-accent '>43</p>
                  </div>
                </div>
              </div>

              {/* --- BOX 4 --- */}
              <div className="flex flex-col gap-14 justify-center items-center rounded-lg border border-gray3 p-6 w-[388px] h-[215px] grow">
                <div className="flex justify-between gap-2 items-center w-full">
                  <div className='flex gap-4 items-center mr-8'>
                    <img className='w-14' src={assets.role2} alt="" />
                    <p className='font-bold text-black text-base'>Roles</p>
                  </div>
                  <div><Dropdown /></div>
                  {/* <img src={assets.plusIcon} alt="" /> */}
                </div>
                <div className='bg-primary2 flex flex-row justify-between items-center px-3 py-3.5  w-full h-[57px] rounded-md'>
                  <p className='text-xs font-medium text-accent whitespace-nowrap'>Total no. of Roles</p>
                  <p className='text-lg font-bold text-accent '>78</p>
                </div>
              </div>

              {/* --- BOX 5 --- */}
              <div className="relative flex flex-col gap-14 justify-center items-center rounded-lg border border-gray3 p-6 w-[388px] h-[215px] grow">
                <div className='flex items-center justify-between w-full'>
                  <div className='flex justify-between items-center gap-4'>
                    <img className='w-14' src={assets.user2} alt="" />
                    <p className='font-bold text-black text-base'>Users</p>
                  </div>
                  <div className='z-20'><Dropdown /></div>
                  {/* <img src={assets.plusIcon} alt="" /> */}
                </div>
                <div className='flex justify-between items-end w-full'>
                  <div className='flex flex-col gap-2 justify-center '>
                    <div className='flex items-center gap-3'>
                      <p className="w-[8px] h-[16px] bg-primary rounded-[2px]"></p>
                      <p className='text-xs font-medium text-accent'>Old Users</p>
                    </div>
                    <div className='flex items-center gap-3'>
                      <p className="w-[8px] h-[16px] bg-gold rounded-[2px]"></p>
                      <p className='text-xs font-medium text-accent'>Last 7 days</p>
                    </div>
                  </div>
                  <div className=''>
                    <img className='absolute bottom-0 right-6' src={assets.arc} alt="" />
                    <div className='absolute bottom-6 right-[50px] flex flex-col gap-3 items-center '>
                      <p className='font-bold text-lg text-accent'>1425</p>
                      <p className='text-gray4 text-xs font-medium'>Total no. of Users</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* --- BOX 6 --- */}
              <div className="relative flex flex-col gap-[17px] justify-center items-center rounded-lg border border-gray3 p-6 w-[388px] h-[215px] grow">
                <div className='flex items-center justify-between w-full'>
                  <div className='flex justify-between items-center gap-4'>
                    <img className='w-14' src={assets.complaints} alt="" />
                    <p className='font-bold text-black text-base'>Branch / Agencies</p>
                  </div>
                  {/* <img src={assets.plusIcon} alt="" /> */}
                </div>
                <div className='flex flex-col gap-1 w-full'>
                  <div className='flex flex-row justify-between items-center p-2 px-3 w-full h-[45px] bg-primary2 rounded-[4px]'>
                      <p className='text-xs font-medium text-accent whitespace-nowrap'>No. of Branches</p>
                      <p className='text-lg font-bold text-accent '>34</p>
                  </div>
                  <div className='flex flex-row justify-between items-center p-2 px-3 w-full h-[45px] bg-gold2 rounded-[4px]'>
                  <p className='text-xs font-medium text-accent whitespace-nowrap'>No. of Agencies</p>
                  <p className='text-lg font-bold text-accent '>12</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
      </main>
    </div>
  )
}

export default Container
