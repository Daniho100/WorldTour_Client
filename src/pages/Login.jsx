import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../../src/assets/assets';
import { Link } from 'react-router-dom';
import PrimaryBtn from '../comppnents/PrimaryBtn';
import { AppContext } from '../context/appContext';




const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const role = await login(email, password);

        // Redirect based on user role
        if (role === 'agent' || role === 'creditAgent') {
            navigate('/agent-dashboard');
        } else if (role === 'superadmin' || role === 'admin') {
            navigate('/superadmin-dashboard');
        } else if (role === 'user') {
            navigate('/user-dashboard');
        } else {
            // Default case if the role is not recognized
            console.error('User not found');
            setError('User role not found');
        }
    } catch (error) {
        setError(error.response?.data?.msg || 'An error occurred during login');
    }
};


  return (
    <div className="relative w-full min-h-screen bg-no-repeat bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${assets.background})` }}>
      <div className="absolute inset-0 bg-[#AA913F] mix-blend-multiply z-1"></div>

      <div className='relative z-2 flex flex-col mx-auto w-[70%] sm:w-[50%]'>
        <div className='flex justify-center my-4'>
          <img src={assets.logo} alt="IGI Logo" className="w-[82.83px] sm:w-[118.33px]" />  
        </div>

        <div className='flex items-center bg-white bg-opacity-80 rounded-xl z-2'>
          <div className='flex flex-col flex-grow justify-center items-center text-center z-10 sm:rounded-xl mb-4 w-full'>
            <h6 className='text-base sm:text-2xl font-bold text-black my-8 mx-auto'>Login</h6>
            <div className='flex flex-row gap-4 mb-4'>
              <p className='text-xs sm:text-base text-black mx-auto font-normal text-center'>
                Don't have an account? <Link to='/registration' className='text-primary underline text-sm sm:text-base font-bold flex-1'>Create an Account</Link>
              </p>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form className='w-full max-w-md mx-auto' onSubmit={handleSubmit}>
              <div className='mb-6 flex flex-col justify-start text-left'>
                <label htmlFor="email" className='text-sm sm:text-base text-[#848484] font-bold mb-1'>Email Address</label>
                <input
                  id="email"
                  className='w-full rounded-md py-3 px-2.5 bg-white border border-gray-300 focus:outline-none focus:border-primary'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter Email Address'
                  required
                /> 
              </div>

              <div className='flex flex-col justify-start text-left mb-6'>
                <label htmlFor="password" className='text-sm sm:text-base text-[#848484] font-bold mb-1'>Password</label>
                <div className='relative flex flex-row justify-between'>
                  <input
                    id="password"
                    className='w-full rounded-md py-3 px-2.5 border border-gray-300 focus:outline-none focus:border-primary'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter Password'
                    required
                  />
                  <img
                    className='w-5 absolute right-4 top-3 cursor-pointer'
                    src={showPassword ? assets.eyeIconOpen : assets.eyeIcon}
                    alt="Toggle Password Visibility"
                    onClick={togglePasswordVisibility}
                  />
                </div>
                <div className='flex flex-row justify-between mt-2'>
                  <Link to="/forgot-password" className='text-sm sm:text-base text-primary cursor-pointer'>Forgot password?</Link>
                </div>
              </div>

              <PrimaryBtn text1={'Login'} onClick={handleSubmit} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;