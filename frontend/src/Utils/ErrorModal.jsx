import React from 'react';

const ErrorModal = ({ isOpen, message, onClose }) => {
  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white p-2 rounded-lg z-10 flex flex-col ">
        <span className=" self-end cursor-pointer text-5xl" onClick={onClose}>
          &times;
        </span>
        <p className="text-red-600 text-lg">{message}</p>
      </div>
    </div>
  ) : null;
};

export default ErrorModal;
