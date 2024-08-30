import React, { useState } from "react";
import avatar from "../utils/profile.png";
import axios from "axios";
import { toast } from "react-toastify";

const ProfilePhoto = ({ myPhoto }) => {
  const [postImage, setPostImage] = useState({ myPhoto: myPhoto });
  const [isEditable, setIsEditable] = useState(false);

  const makeEditable = () => {
    setIsEditable(!isEditable);
  };

  const createPost = async (newImage) => {
    try {
      const response = await axios.post("/api/profile/photo", {
        photo: newImage,
      },
      {
        headers: {
          'ngrok-skip-browser-warning': 'any-value'
        }}   );

      if (response.status === 200) {
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error("Error uploading image:", error);
    }
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage.myPhoto);
    setIsEditable(false); // Reset editable state after submission
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myPhoto: base64 });
  };

  return (
    <form onSubmit={handleSubmit} class="mt-10 flex flex-col items-center">
      <label class="relative">
        <img
          src={postImage.myPhoto || avatar}
          alt="Profile"
          class="h-52 w-52 rounded-full border-4 border-gray-300 shadow-lg object-cover"
        />
        {isEditable && (
          <input
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            type="file"
            name="myFile"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            onChange={handleFileUpload}
          />
        )}
      </label>

      {isEditable ? (
        <div class="flex gap-10">
<div
          onClick={makeEditable}
          class="mt-4 px-4 py-2 bg-red-500 text-gray-700 rounded cursor-pointer hover:bg-red-400 transition-all"
        >
         Cancel
        </div>

        <button
          type="submit"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
        >
          Save
        </button>
        </div>

      ) : (
        <div
          onClick={makeEditable}
          class="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300 transition-all"
        >
          Edit Profile Photo
        </div>
      )}
    </form>
  );
};

export default ProfilePhoto;
