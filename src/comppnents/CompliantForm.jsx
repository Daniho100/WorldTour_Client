import React, { useState } from "react";

const CompliantForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle Image Upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // Set the image data URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary2">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Submit Your Comment
        </h2>
        <form className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary2 focus:border-primary2"
              placeholder="Enter your email"
            />
          </div>

          {/* Topic Input */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-600">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary2 focus:border-primary2"
              placeholder="Enter the topic"
            />
          </div>

          {/* Comment Textarea */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-600">
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              rows="4"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary2 focus:border-primary2"
              placeholder="Write your comment here"
            ></textarea>
          </div>

          {/* Upload Photo */}
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-600">
              Upload Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              className="mt-1 w-full text-gray-600"
              accept="image/*"
              onChange={handleImageChange}
            />
            {selectedImage && (
              <div className="mt-4">
                <img
                  src={selectedImage}
                  alt="Uploaded Preview"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompliantForm;
