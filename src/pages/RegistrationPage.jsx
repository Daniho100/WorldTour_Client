import { useNavigate, useParams } from 'react-router-dom';
import CoverDestination from '../comppnents/Registration/CoverDestination';
import NextOfKin from '../comppnents/Registration/NextOfKin';
import Others from '../comppnents/Registration/Others';
import PersonalData from '../comppnents/Registration/PersonalData';
import Header from '../comppnents/Header';
import Footer from '../comppnents/Footer';
import ProgressBar from '../comppnents/ProgressBar';
import LoginDetails from '../comppnents/Registration/LoginDetails';
import { useState } from 'react';
import AppSummary from './AppSummary';


const RegistrationPage = () => {

  const navigate = useNavigate();
  const { sectionId } = useParams();
  const [progress, setProgress] = useState(0); 


  const sectionComponents = {
      personalData: PersonalData,
      nextOfKin: NextOfKin,
      coverDestination: CoverDestination,
      loginDetails: LoginDetails,
      others: Others,
      appSummary: AppSummary, 

  };


    const sections = [ 'personalData', 'nextOfKin', 'coverDestination', 'loginDetails', 'others', 'appSummary' ];

    const currentStep = sections.indexOf(sectionId);
    const SectionComponent = sectionComponents[sectionId] || PersonalData;
    
    const handleNextSection = () => {
      const nextIndex = currentStep + 1;

      if (nextIndex < sections.length) {
        navigate(`/registration/${sections[nextIndex]}`);
        } else {
          navigate('/registration/appSummary'); 
        }
      };

      const handleProgressUpdate = (newProgress) => {
        setProgress(newProgress);
      };


  return (
    <div className='bg-gray2'>
      {/* ---- Header ---- */}
      <Header />



      <div className='flex flex-col items-center gap-2 mt-8'>
        <h1 className='text-xl sm:text-3xl font-bold'>IGI Travel Insurance</h1>
        <p className='text-sm sm:text-base'>Proposal {'('}Registration{')'} Form</p>
      </div>

      {sectionId !== 'appSummary' && (
        <div className='flex flex-col sm:flex-row items-center justify-evenly mb-20 sm:mb-48 mt-8 mx-5'>
        <ProgressBar currentStep={currentStep} />

        <SectionComponent className='' handleNextSection={handleNextSection} onProgressUpdate={handleProgressUpdate}/>
      </div>
      )}

      {/* App Summary Rendering */}
      {sectionId === 'appSummary' && (
        <div className="flex justify-center items-center mb-[96px] mt-5 sm:mt-8 sm:mb-[132px] sm:my-10">
          <AppSummary />
        </div>
      )}
      




      {/* ---- Footer ---- */}
      <Footer />
    </div>
  )
}

export default RegistrationPage












// // Working code
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import ConfirmationModal from './ConfirmationModal';


// const RegisterUserForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     surname: '',
//     firstNames: '',
//     gender: '',
//     dob: '',
//     email: '',
//     password: '',
//     phone: '',
//     address: '',
//     premium: '',
//     couponCode: '',
//     birthPlace: '',
//     nin: '',
//     maritalStat: '',
//     occupat: '',
//     stateOfRes: '',
//     lgaOfRes: '',
//     nationality: '',
//     origState: '',
//     origLga: '',
//     passNum: '',
//     issuedOn: '',
//     expires: '',
//     payRefId: '',
//     destination: '',
//     startDate: '',
//     endDate: '',
//   });

//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showModal, setShowModal] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };



//   const calculateAge = (dob) => {
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage('');
//     setSuccessMessage('');

//     const age = calculateAge(formData.dob);

//     if (age < 18) {
//       // Show modal for supervision confirmation
//       setShowModal(true);
//       setLoading(false); // Stop loading until we get confirmation
//     } else {
//       // Proceed with registration
//       await registerUser();
//     }
//   };

//   const registerUser = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:8081/register', formData);
//       if (response.status === 201) {
//         setSuccessMessage('User registered and policy created successfully.');
//         navigate('/dashboard');
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Error registering user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleConfirmSupervision = async () => {
//     setShowModal(false); // Close the modal
//     await registerUser();      // Proceed with registration
//   };

//   const handleCancelSupervision = () => {
//     setShowModal(false);  // Close the modal
//     setFormData({ ...formData, dob: '' }); // Clear DOB to allow re-entry
//   };

//   return (
//     <div className="container mx-auto p-5">
//       <h2 className="text-2xl font-bold mb-4">Register New User</h2>

//       {errorMessage && (
//         <div className="mb-4 text-red-500">{errorMessage}</div>
//       )}
      
//       {successMessage && (
//         <div className="mb-4 text-green-500">{successMessage}</div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Personal Information */}
//         <div className="flex space-x-4">
//           <div className="w-1/2">
//             <label htmlFor="surname" className="block">Surname</label>
//             <input
//               type="text"
//               id="surname"
//               name="surname"
//               value={formData.surname}
//               onChange={handleChange}
//               className="w-full p-2 border"
//               required
//             />
//           </div>
//           <div className="w-1/2">
//             <label htmlFor="firstNames" className="block">First Names</label>
//             <input
//               type="text"
//               id="firstNames"
//               name="firstNames"
//               value={formData.firstNames}
//               onChange={handleChange}
//               className="w-full p-2 border"
//               required
//             />
//           </div>
//         </div>

//         {/* Gender and Date of Birth */}
//         <div className="flex space-x-4">
//           <div className="w-1/2">
//             <label htmlFor="gender" className="block">Gender</label>
//             <select
//               id="gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full p-2 border"
//               required
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//           </div>
//           <div className="w-1/2">
//             <label htmlFor="dob" className="block">Date of Birth</label>
//             <input
//               type="date"
//               id="dob"
//               name="dob"
//               value={formData.dob}
//               onChange={handleChange}
//               className="w-full p-2 border"
//               required
//             />
//           </div>
//         </div>

//         {/* Contact Information */}
//         <div className="flex space-x-4">
//           <div className="w-1/2">
//             <label htmlFor="email" className="block">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border"
//               required
//             />
//           </div>
//           <div className="w-1/2">
//             <label htmlFor="phone" className="block">Phone Number</label>
//             <input
//               type="text"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full p-2 border"
//               required
//             />
//           </div>
//         </div>

//         {/* Address */}
//         <div>
//           <label htmlFor="address" className="block">Address</label>
//           <textarea
//             id="address"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="w-full p-2 border"
//             required
//           />
//         </div>

//         {/* Premium and Coupon */}
//         <div className="flex space-x-4">
//           <div className="w-1/2">
//             <label htmlFor="premium" className="block">Premium</label>
//             <input
//               type="number"
//               id="premium"
//               name="premium"
//               value={formData.premium}
//               onChange={handleChange}
//               className="w-full p-2 border"
//               required
//             />
//           </div>
//           <div className="w-1/2">
//             <label htmlFor="couponCode" className="block">Coupon Code</label>
//             <input
//               type="text"
//               id="couponCode"
//               name="couponCode"
//               value={formData.couponCode}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             />
//           </div>
//         </div>

//         {/* Additional Information */}
//         <div className="flex space-x-4">
//           <div className="w-1/2">
//             <label htmlFor="birthPlace" className="block">Place of Birth</label>
//             <input
//               type="text"
//               id="birthPlace"
//               name="birthPlace"
//               value={formData.birthPlace}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             />
//           </div>
//           <div className="w-1/2">
//             <label htmlFor="nin" className="block">NIN</label>
//             <input
//               type="text"
//               id="nin"
//               name="nin"
//               value={formData.nin}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             />
//           </div>
//         </div>

//         {/* Marital Status and Occupation */}
//         <div className="flex space-x-4">
//           <div className="w-1/2">
//             <label htmlFor="maritalStat" className="block">Marital Status</label>
//             <select
//               id="maritalStat"
//               name="maritalStat"
//               value={formData.maritalStat}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             >
//               <option value="">Select Status</option>
//               <option value="single">Single</option>
//               <option value="married">Married</option>
//               <option value="divorced">Divorced</option>
//             </select>
//           </div>
//           <div className="w-1/2">
//             <label htmlFor="occupat" className="block">Occupation</label>
//             <input
//               type="text"
//               id="occupat"
//               name="occupat"
//               value={formData.occupat}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             />
//           </div>
//         </div>

//         {/* Location and Identification */}
//         <div className="flex space-x-4">
//           <div className="w-1/2">
//             <label htmlFor="stateOfRes" className="block">State of Residence</label>
//             <input
//               type="text"
//               id="stateOfRes"
//               name="stateOfRes"
//               value={formData.stateOfRes}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             />
//           </div>
//           <div className="w-1/2">
//             <label htmlFor="lgaOfRes" className="block">LGA of Residence</label>
//             <input
//               type="text"
//               id="lgaOfRes"
//               name="lgaOfRes"
//               value={formData.lgaOfRes}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             />
//           </div>
//         </div>

//         <div className="flex space-x-4">
//           <div className="w-1/2">
//             <label htmlFor="nationality" className="block">Nationality</label>
//             <input
//               type="text"
//               id="nationality"
//               name="nationality"
//               value={formData.nationality}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             />
//           </div>
//           <div className="w-1/2">
//             <label htmlFor="origState" className="block">State of Origin</label>
//             <input
//               type="text"
//               id="origState"
//               name="origState"
//               value={formData.origState}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             />
//           </div>
//         </div>

//         {/* Passport Details */}
//         <div className="flex space-x-4">
//           <div className="w-1/2">
//             <label htmlFor="passNum" className="block">Passport Number</label>
//             <input
//               type="text"
//               id="passNum"
//               name="passNum"
//               value={formData.passNum}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             />
//           </div>
//           <div className="w-1/2">
//             <label htmlFor="issuedOn" className="block">Passport Issued On</label>
//             <input
//               type="date"
//               id="issuedOn"
//               name="issuedOn"
//               value={formData.issuedOn}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             />
//           </div>
//         </div>

//         {/* Passport Expiry and Reference */}
//         <div className="flex space-x-4">
//           <div className="w-1/2">
//             <label htmlFor="expires" className="block">Passport Expiry Date</label>
//             <input
//               type="date"
//               id="expires"
//               name="expires"
//               value={formData.expires}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             />
//           </div>
//           <div className="w-1/2">
//             <label htmlFor="payRefId" className="block">Payment Reference ID</label>
//             <input
//               type="text"
//               id="payRefId"
//               name="payRefId"
//               value={formData.payRefId}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             />
//           </div>
//         </div>

//         {/* Destination and Policy Dates */}
//         <div className="flex space-x-4">
//           <div className="w-1/2">
//             <label htmlFor="destination" className="block">Destination</label>
//             <input
//               type="text"
//               id="destination"
//               name="destination"
//               value={formData.destination}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             />
//           </div>
//           <div className="w-1/2">
//             <label htmlFor="startDate" className="block">Policy Start Date</label>
//             <input
//               type="date"
//               id="startDate"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             />
//           </div>
//         </div>

//         <div className="flex space-x-4">
//           <div className="w-1/2">
//             <label htmlFor="endDate" className="block">Policy End Date</label>
//             <input
//               type="date"
//               id="endDate"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//               className="w-full p-2 border"
//             />
//           </div>
          
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-center mt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-primary w-72 text-white py-2 px-6 rounded disabled:opacity-50"
//           >
//             {loading ? 'Registering...' : 'Register User'}
//           </button>
//         </div>
//       </form>


//        {/* Supervision Confirmation Modal */}
//        {showModal && (
//         <ConfirmationModal
//           onConfirm={handleConfirmSupervision}
//           onCancel={handleCancelSupervision}
//         />
//       )}
//     </div>
//   );
// };

// export default RegisterUserForm;

