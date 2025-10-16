import { useNavigate } from 'react-router-dom'
import assets from '../../src/assets/assets'
import PrimaryBtn from '../comppnents/PrimaryBtn'
import SecondaryBtn from '../comppnents/SecondaryBtn'
import styles from './home.module.css'


const Home = () => {
     const navigate = useNavigate();

     const handleGetStarted = () => {
        navigate('/login');
    }


  return (
    <div className="relative w-full min-h-screen bg-no-repeat bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${assets.background})` }}>
        <div className="absolute inset-0 bg-[#AA913F] mix-blend-multiply z-1"></div>
        
        <div className='relative z-2'>
            <div className='flex justify-center my-14'>
                <img src={assets.logo} alt="IGI Logo" className="w-[82.83px] sm:w-[118.33px]" />  
            </div>

            <div className="flex flex-col flex-grow items-center justify-center mt-20 sm:mt-26 text-center px-4 gap-4 mx-10">
            
                <div className='mb-32 sm:mb-8'>
                    <p className='text-primary font-bold text-lg text-center mb-5'>IGI Travel Insurance</p>
                    <h1 className="text-white text-4xl sm:text-7xl font-bold sm:leading-tight relative"> Buy the <span className={`text-yellow-500 sm:m-[-10px] relative z-10  ${styles.best} text-center`} >Best
                    </span> Travel Insurance <br /> Plan for You. 
                    </h1>
                </div>

            
                <div className="mt-10 sm:mt-6 space-x-4 flex justify-between text-sm sm:text-base">
                    <SecondaryBtn text1={'Get Started'} onClick={handleGetStarted} />
                    <PrimaryBtn text1={'Agent Portal'}/>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Home
