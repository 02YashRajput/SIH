import React from 'react';
import {toast} from "react-toastify"
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const StatusUpdate = ({ index, setIndex, statusArray, setIsVisible, id  , setContractStatus}) => {
  const location = useLocation();

  const cancelHandler = () => {
    setIsVisible(false);
  };
  const submitHandler = async () => {
    try {
      let statsArray = [];
  
      // Ensure index and array bounds are handled properly
      if (statusArray[index + 1]) {
        statsArray.push(statusArray[index + 1][0]);
  
        if (statusArray[index + 1][1] === "Default" && statusArray[index + 2]) {
          statsArray.push(statusArray[index + 2][0]);
          setIndex(index + 2);
        } else {
          setIndex(index + 1);
        }
  
        // Post the data to the server
        const res = await axios.post(`/api${location.pathname}?id=${id}`, statsArray,
          {
            headers: {
              'ngrok-skip-browser-warning': 'any-value'
            }}   );
       setContractStatus(res.data.contractStatus)
        if (res.status === 200) {
          toast.success('Status updated successfully.');
          setIsVisible(false);
        } else {
          toast.error('Failed to update status. Please try again.');
        }
      } else {
        toast.error('Invalid index. Unable to update status.');
      }
    } catch (error) {
      console.error('Error during status update:', error);
      toast.error('An error occurred while updating status. Please try again.');
    }
  };
  

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg flex flex-col">
        <p>Do you want to make {statusArray[index + 1][0]}?</p>
        <div class='flex justify-between mt-4'>
          <button onClick={cancelHandler} class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={submitHandler} class="px-4 py-2 bg-blue-500 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdate;
