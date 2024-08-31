import React, { useEffect, useState } from "react";
import PaymentModal from "./PaymentModel";

const OrderStatus = ({userType, currentStatusIndex, statusArray }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handlePayNowClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/contract/profile",
          {
            headers: {
              'ngrok-skip-browser-warning': 'any-value'
            }}   );
        const data = await response.json();
        console.log(data);
        setModalData(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render.

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
                    onClick={handlePayNowClick}
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

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
      />
    </div>
  );
};

export default OrderStatus;
