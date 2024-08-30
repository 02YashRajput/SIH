import React from 'react';
import { useNavigate } from 'react-router-dom';

const TableComponent = ({ data, status }) => {
  const navigate = useNavigate();

  const handleRowClick = (contractId) => {
    navigate(`/contract?id=${contractId}`);
  };

  return (
    <div class="p-5">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-4 py-2 text-2xl text-center">Contract Id</th>
            <th class="px-4 py-2 text-2xl text-center">Buyer Name</th>
            <th class="px-4 py-2 text-2xl text-center">Farmer Name</th>
            <th class="px-4 py-2 text-2xl text-center">Product Name</th>
            {status === "Ongoing" && (
              <th class="px-4 py-2 text-2xl text-center">Current Status</th>
            )}
            <th class="px-4 py-2 text-2xl text-center">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.ContractId}
              class="even:bg-gray-100 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
              onClick={() => handleRowClick(row.ContractId)}
            >
              <td class="px-4 py-2 text-lg text-center">{row.ContractId}</td>
              <td class="px-4 py-2 text-lg text-center">{row.BuyerName}</td>
              <td class="px-4 py-2 text-lg text-center">{row.FarmerName}</td>
              <td class="px-4 py-2 text-lg text-center">{row.productName}</td>
              {status === "Ongoing" && (
                <td class="px-4 py-2 text-lg text-center">{row.currentStatus}</td>
              )}
              <td class="px-4 py-2 text-lg text-center">
                {new Date(row.deadline).toLocaleDateString("en-GB")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
