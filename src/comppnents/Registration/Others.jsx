import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import assets from "../../assets/assets";

const Others = ({ handleNextSection }) => {
  const navigate = useNavigate();
  const { formData, handleChange } = useContext(AppContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [hasCondition, setHasCondition] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  // Reference for the hidden file input element
  const fileInputRef = useRef(null);

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result); // Preview the uploaded image
        setImageUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to trigger file input click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleNext = () => {
    if (currentQuestionIndex === 0) {
      handleChange('others', 'q1', hasCondition); // Save answer to formData
      if (hasCondition === 'yes') {
        setCurrentQuestionIndex(1); // Move to the details question
      } else if (hasCondition === 'no') {
        setCurrentQuestionIndex(2); // Directly move to the image upload question
      }
    } else if (currentQuestionIndex === 1) {
      if (inputValue !== '') {
        handleChange('others', 'q2', inputValue); // Save answer to formData
        setCurrentQuestionIndex(2); // Move to the image upload question
      }
    } else if (currentQuestionIndex === 2) {
      if (imageUploaded) {
        handleChange('others', 'image', imagePreviewUrl); // Save image to formData
        setCurrentQuestionIndex(3); // Proceed to the final section
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div>
      <div className="mt-4 p-6 sm:p-12 bg-white rounded-lg shadow-lg w-full max-w-[646px] h-[345px] flex flex-col justify-between">
        <div className="flex flex-col items-start w-full">
          <h2 className="text-2xl font-bold mb-4 text-accent mx-auto">Others</h2>
          <p
            className={`bg-primary text-center h-1 rounded mb-6 mx-auto`}
            style={{ width: `${(currentQuestionIndex + 1) * 30.3}px`, transition: 'width 0.3s' }}
          ></p>
        </div>

        <div className="flex flex-col items-center w-full sm:max-w-[534px] h-full">
          <div className="mb-8 mt-4 w-full h-full flex flex-col justify-center">
            {currentQuestionIndex === 0 ? (
              <>
                <label className="block text-gray3 text-sm font-bold mb-2">Do you have any pre-existing medical condition(s)?</label>
                <select
                  value={hasCondition}
                  onChange={(e) => setHasCondition(e.target.value)}
                  className="border rounded w-full sm:w-[534px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </>
            ) : currentQuestionIndex === 1 ? (
              <>
                <label className="block text-gray-700 text-sm font-bold mb-2">What could that be?</label>
                <input
                  type="text"
                  placeholder="Enter details"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border rounded w-full sm:max-w-[534px] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                />
              </>
            ) : currentQuestionIndex === 2 ? (
              <div className="flex flex-col items-center">
                <label className="block text-gray-700 text-sm font-bold mb-2">Upload an image</label>

                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt="Uploaded Preview"
                    className="w-40 h-40 object-cover rounded-md mb-4 cursor-pointer"
                    onClick={handleImageClick} // Open file selection when image is clicked
                  />
                ) : (
                  <img
                    src={assets.ImageUpload}
                    alt="Upload Placeholder"
                    className="w-40 h-40 object-cover rounded-md mb-4 cursor-pointer"
                    onClick={handleImageClick} // Open file selection when image is clicked
                  />
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {imageUploaded && <p className="text-darkgreen-500 mt-2">Image uploaded successfully!</p>}
              </div>
            ) : (
              <div>
                <p className="text-lg text-gray-700">Review your details and proceed to make payment.</p>
              </div>
            )}
          </div>

          <div className="flex gap-8">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="mt-4 w-26 py-3 px-6 rounded-lg bg-primary text-white"
              >
                Previous
              </button>
            )}
            {currentQuestionIndex === 3 ? (
              <button
                onClick={handleNextSection}
                className="mt-4 w-26 py-3 px-6 rounded-lg bg-primary text-white"
              >
                Application Summary
              </button>
            ) : (
              <button
                onClick={handleNext}
                className={`mt-4 w-26 py-3 px-6 rounded-lg ${currentQuestionIndex === 0 ? (hasCondition ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500') : (currentQuestionIndex === 1 ? (inputValue ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500') : (currentQuestionIndex === 2 ? (imageUploaded ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500') : 'hidden'))}`}
                disabled={currentQuestionIndex === 0 ? !hasCondition : (currentQuestionIndex === 1 ? inputValue === '' : (currentQuestionIndex === 2 && !imageUploaded))}
              >
                Next
              </button>
            )}
            {currentQuestionIndex === 3 && (
              <button
                onClick={() => navigate('/registration/appSummary')}
                className="mt-4 w-20 px-3 rounded-lg bg-white text-black border border-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Others;
