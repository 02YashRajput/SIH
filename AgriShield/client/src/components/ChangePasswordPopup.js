import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChangePasswordPopup = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      const res = await axios.patch('/api/profile/change-password', {
        oldpassword :oldPassword,
        newpassword:newPassword,
        confirmpassword:confirmPassword
      },{
        headers: {
          'ngrok-skip-browser-warning': 'any-value'
        }});
      if (res.status === 200) {
        toast.success("Password changed successfully.");
        onClose();
      } else {
        toast.error("Failed to change password.");
      }
    } catch (error) {
      toast.error("An error occurred while changing password.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed text-xl inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl mb-4">Change Password</h2>
        <label className="block mb-2">
          <span className="text-gray-700">Old Password:</span>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 block w-full border-[2px] outline-none border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">New Password:</span>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full border-[2px] outline-none border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Confirm New Password:</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full border-[2px] outline-none border-gray-300 rounded-md"
          />
        </label>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded-lg">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
