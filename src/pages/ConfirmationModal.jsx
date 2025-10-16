import React from 'react';

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded shadow-lg text-center max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-3">Parental Supervision Required</h3>
        <p>Your age is below 18. Registration requires adult supervision. Do you want to continue?</p>
        <div className="mt-5 flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
