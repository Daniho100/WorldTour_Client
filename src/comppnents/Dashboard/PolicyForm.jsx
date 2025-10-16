import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const PolicyForm = ({ onClose, userRole }) => {
  const navigate = useNavigate();
  const [policyData, setPolicyData] = useState(null);

  const defaultValues = {
    surname: '', firstNames: '', gender: '', dob: '', birthPlace: '', nin: '',
    maritalStat: '', occupat: '', email: '', password: '', address: '',
    stateOfRes: '', lgaOfRes: '', nationality: '', origState: '', origLga: '',
    phone: '', passNum: '', issuedOn: '', expires: '', payRefId: '',
    destination: '', startDate: '', endDate: '', premium: '', 
    creditBalance: 0, couponCode: '', voucherCode: '',
  };

  const validationSchema = Yup.object().shape({
    surname: Yup.string().required('Required'),
    firstNames: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    dob: Yup.date().required('Required'),
    birthPlace: Yup.string().required('Required'),
    nin: Yup.string().required('Required'),
    maritalStat: Yup.string().required('Required'),
    occupat: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too Short!').required('Required'),
    address: Yup.string().required('Required'),
    stateOfRes: Yup.string().required('Required'),
    lgaOfRes: Yup.string().required('Required'),
    nationality: Yup.string().required('Required'),
    origState: Yup.string().required('Required'),
    origLga: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    passNum: Yup.string().required('Required'),
    issuedOn: Yup.date().required('Required'),
    expires: Yup.date().required('Required'),
    destination: Yup.string().required('Required'),
    startDate: Yup.date().required('Required'),
    endDate: Yup.date().required('Required'),
    premium: Yup.number().required('Required').positive('Must be positive'),
    voucherCode: Yup.string(),
    couponCode: Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    try {
      // Save form data to state
      setPolicyData(values);
      console.log("Here's the collected data", values);
      
      // Navigate to application summary page
      navigate('/application-summary');
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const FormField = ({ label, name, type = 'text' }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Field
        type={type}
        name={name}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-black">Create New Policy</h2>
      </div>

      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Surname" name="surname" />
                <FormField label="First Names" name="firstNames" />
                <FormField label="Gender" name="gender" />
                <FormField label="Date of Birth" name="dob" type="date" />
                <FormField label="Birth Place" name="birthPlace" />
                <FormField label="NIN" name="nin" />
                <FormField label="Marital Status" name="maritalStat" />
                <FormField label="Occupation" name="occupat" />
                <FormField label="Phone" name="phone" />
                <FormField label="Address" name="address" />
                <FormField label="State of Residence" name="stateOfRes" />
                <FormField label="LGA of Residence" name="lgaOfRes" />
                <FormField label="Nationality" name="nationality" />
                <FormField label="State of Origin" name="origState" />
                <FormField label="LGA of Origin" name="origLga" />
              </div>
            </div>

            {/* Login Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Login Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Email" name="email" type="email" />
                <FormField label="Password" name="password" type="password" />
              </div>
            </div>

            {/* Travel Document Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Travel Document
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Passport Number" name="passNum" />
                <FormField label="Issued Date" name="issuedOn" type="date" />
                <FormField label="Expiry Date" name="expires" type="date" />
              </div>
            </div>

            {/* Cover and Destination Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Cover and Destination
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Destination" name="destination" />
                <FormField label="Departure Date" name="startDate" type="date" />
                <FormField label="End Date" name="endDate" type="date" />
              </div>
            </div>

            {/* Other Details Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Other Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Coupon Code" name="couponCode" />
                {userRole === 'creditAgent' && <FormField label="Voucher Code" name="voucherCode" />}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50"
              >
                Create Policy
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PolicyForm;


