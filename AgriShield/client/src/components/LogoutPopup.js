import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const LogoutPopup = ({ isOpen, onClose }) => {
  const handleLogout = async () => {
    try {
      const res = await axios.post('/api/logout',
        {
          headers: {
            'ngrok-skip-browser-warning': 'any-value'
          }}   );
      if (res.status === 200) {
        toast.success("Logged out successfully.");
        window.location.reload(); // or redirect to login page
      } else {
        toast.error("Failed to log out.");
      }
    } catch (error) {
      toast.error("An error occurred during logout.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl mb-4">Confirm Logout</h2>
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
            Cancel
          </button>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
