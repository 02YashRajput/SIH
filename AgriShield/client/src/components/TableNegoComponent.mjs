import React, { useState } from 'react';
import NegotiationModal from './NegotiationModal.js';
const TableNegoComponent = ({ data,userType }) => {
  const [selectedContract, setSelectedContract] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const handleRowClick = (row) => {
    setSelectedContract(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContract(null);
  };

  return (
    <div className="p-5">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-2xl text-center">Buyer Name</th>
            <th className="px-4 py-2 text-2xl text-center">Farmer Name</th>
            <th className="px-4 py-2 text-2xl text-center">Product Name</th>
            <th className="px-4 py-2 text-2xl text-center">Duration</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="even:bg-gray-100 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
              onClick={() => handleRowClick(row)}
            >
              <td className="px-4 py-2 text-lg text-center">{row.BuyerName}</td>
              <td className="px-4 py-2 text-lg text-center">{row.FarmerName}</td>
              <td className="px-4 py-2 text-lg text-center">
                {capitalizeFirstLetter(row.productName)}
              </td>

              <td className="px-4 py-2 text-lg text-center">
                {row.duration} months
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <NegotiationModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        contract={selectedContract} 
        userType={userType}
      />
    </div>
  );
};

export default TableNegoComponent;
