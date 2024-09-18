import React from "react";
import { toast } from "react-toastify";

import useRazorpay from 'react-razorpay';
const OrderStatus = ({userType,contract,email,phone, currentStatusIndex, statusArray }) => {
  console.log({contract},phone,email)
  const [Razorpay] = useRazorpay();
  const handlePayNowClick = (index) => {
    const options = {
      key: 'rzp_test_c1jrmDzcTuWA73', // Your public test key
      amount: index === 0 ? contract.initialPaymentAmount*100 : contract.finalPaymentAmount *100, // Amount is in currency subunits (100 = 100 INR, i.e. 1 INR)
      currency: 'INR',
      name: 'AgriShield Transaction',
      description: 'This is a  payment',
      handler: function (response) {
        toast.success(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: 'Test User',
        email: `${email}`,
        contact:`${phone}`,
      },
      theme: {
        color: '#a7f3d0',
      },
    };

    const rzp = new Razorpay(options);
    rzp.on("payment.failed", function (response) {
      toast.error(response.error.code);
      toast.error(response.error.description);
      toast.error(response.error.source);
      toast.error(response.error.step);
      toast.error(response.error.reason);

    });
  
    rzp.open();
  };

 
  return (
    <div className="flex flex-col gap-5 texl-lg my-8">
      <div className="mb-6 relative">
        <div className="absolute left-[7px] top-[5px] bottom-[1.9rem] w-0.5 bg-gray-300"></div>
        {statusArray.map((status, index) => (
          <div key={index} className="flex items-center mb-6 relative">
            <div
              className={`w-3.5 h-3.5 translate-x-[2px] rounded-full ${
                index <= currentStatusIndex ? "bg-green-500" : "bg-gray-300"
              } z-10`}
            ></div>
            <div className="ml-6">
              <span
                className={`font-semibold ${
                  index <= currentStatusIndex ? "text-green-600" : "text-gray-600"
                }`}
              >
                {status[0]}
                {userType === "Buyer" && status[0] === "Initial Payment Pending"  && (currentStatusIndex === 0  ) && (
                  <button
                    onClick={()=> status[0] === "Initial Payment Pending" ? handlePayNowClick(0) : handlePayNowClick(1)}
                    className="ml-5 bg-blue-500 text-white px-4 py-2 rounded-xl"
                  >
                    Pay Now
                  </button>
                )}
                {(userType === "Buyer" &&
                  status[0] === "Final Payment Pending") &&( currentStatusIndex === 6 ) && (
                  <button
                    onClick={handlePayNowClick}
                    className="ml-5 bg-blue-500 text-white px-4 py-2 rounded-xl"
                  >
                    Pay Now
                  </button>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-gray-700 mb-4">
        Current Status: {statusArray[currentStatusIndex][0]}
      </div>

    </div>
  );
};

export default OrderStatus;