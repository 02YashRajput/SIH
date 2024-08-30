import React from "react";

const PaymentModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 w-96">
        <h2 className="text-xl font-semibold mb-4">Bank Details</h2>
        <div className="mb-4">
          <h3 className="font-semibold">Bank Name:</h3>
          <p>{data.bankDetails.bankName || "Not Provided"}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Account Holder Name:</h3>
          <p>{data.bankDetails.accountHolderName || "Not Provided"}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Account Number:</h3>
          <p>{data.bankDetails.accountNumber || "Not Provided"}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">IFSC Code:</h3>
          <p>{data.bankDetails.IFSCCode || "Not Provided"}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">UPI ID:</h3>
          <p>{data.upiDetails.upiId || "Not Provided"}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">UPI Name:</h3>
          <p>{data.upiDetails.upiName || "Not Provided"}</p>
        </div>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
