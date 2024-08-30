import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MarketPlaceBuyer = (props) => {
   // eslint-disable-next-line
  const [listedContracts, setListedContracts] = useState(props.listedContracts);
  const [selectedContract, setSelectedContract] = useState(null); // New state for selected contract

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const initialPaymentAmount = parseFloat(formData.get("initialPaymentAmount"));
    const totalPaymentAmount = parseFloat(formData.get("totalPaymentAmount"));

    const contractData = {
      productName: formData.get("productName"),
      initialPaymentAmount: initialPaymentAmount,
      finalPaymentAmount: totalPaymentAmount - initialPaymentAmount,
      duration: formData.get("duration"),
      productQuantity: formData.get("productQuantity"),
      productDescription: formData.get("productDescription"),
    };

    // Validation
    for (const [key, value] of Object.entries(contractData)) {
      if (!value) {
        toast.error(`${key.replace(/([A-Z])/g, ' $1').trim()} is empty`);
        return;
      }
    }

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude,longitude)  
          // Include location in contractData
          contractData.location = { latitude, longitude };

          try {
            const response = await axios.post("/api/market-place/list-contract", contractData,
              {
                headers: {
                  'ngrok-skip-browser-warning': 'any-value'
                }}   );
            if (response.status === 201) {
              toast.success("Contract listed successfully!");
              form.reset();
              props.refetchData()
            }
          } catch (error) {
            console.log(error);
            toast.error("Failed to list contract. Please try again.");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Could not get your location. Please enable location services and try again.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  const crops = [
    "arhar", "bajra", "barley", "copra", "cotton", "gram", "groundnut", "jowar", "jute", "maize",
    "masoor", "moong", "niger", "paddy", "ragi", "rape", "safflower", "sesamum", "soyabean",
    "sugarcane", "sunflower", "urad", "wheat",
  ];

  const handleContractClick = (contract) => {
    setSelectedContract(contract);
  };

  const handleCloseModal = () => {
    setSelectedContract(null);
  };

  return (
    <div className="w-full flex flex-col gap-20 justify-center items-center">
      <div className="w-[60%] px-20 py-10 border-[2px] border-gray-300 shadow-lg flex flex-col gap-10">
        <h1 className="text-3xl font-bold">List Your Contract</h1>
        <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-4">
            <div className="grid gap-1">
              <label htmlFor="crop-name" className="text-lg font-medium">Crop Name</label>
              <select
                id="crop-name"
                name="productName"
                className="border-[1px] border-gray-200 px-5 py-2 shadow-inner outline-none bg-white"
              >
                {crops.map((crop, index) => (
                  <option key={index} value={crop}>{capitalizeFirstLetter(crop)}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-1">
              <label htmlFor="initial-amount" className="text-lg font-medium">Initial Payment Amount</label>
              <input
                id="initial-amount"
                type="number"
                name="initialPaymentAmount"
                placeholder="₹500"
                className="border-[1px] border-gray-200 px-5 py-2 shadow-inner outline-none"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="total-amount" className="text-lg font-medium">Total Payment Amount</label>
              <input
                id="total-amount"
                type="number"
                name="totalPaymentAmount"
                placeholder="₹500"
                className="border-[1px] border-gray-200 px-5 py-2 shadow-inner outline-none"
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <label htmlFor="contract-duration" className="text-lg font-medium">Contract Duration</label>
              <input
                name="duration"
                id="contract-duration"
                type="text"
                placeholder="3 months"
                className="border-[1px] border-gray-200 px-5 py-2 shadow-inner outline-none"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="quantity" className="text-lg font-medium">Quantity (q.)</label>
              <input
                id="quantity"
                name="productQuantity"
                type="number"
                placeholder="1000"
                className="border-[1px] border-gray-200 px-5 py-2 shadow-inner outline-none"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="additional-info" className="text-lg font-medium">Additional Information</label>
              <textarea
                id="additional-info"
                name="productDescription"
                rows={5}
                placeholder="Provide any additional details about the contract..."
                className="border-[1px] border-gray-200 px-5 py-2 shadow-inner outline-none"
              />
            </div>
          </div>
          <button className="px-4 w-40 py-2 bg-black text-white text-lg font-semibold rounded-lg">
            List Contract
          </button>
        </form>
      </div>

      {listedContracts.length > 0 ? (
        <div className="w-[60%] px-20 py-10 border-[2px] border-gray-300 shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Listed Contracts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listedContracts.map((contract, index) => {
              const totalAmount = contract.initialPaymentAmount + contract.finalPaymentAmount;

              return (
                <div
                  key={index}
                  className="flex p-4 border rounded-lg shadow-md cursor-pointer"
                  onClick={() => handleContractClick(contract)}
                >
                  <div className="flex-1 pr-4">
                    <h2 className="text-xl font-semibold mb-2 capitalize">{capitalizeFirstLetter(contract.productName)}</h2>
                    <p className="mb-2">Quantity: {contract.productQuantity} q.</p>
                    <p className="mb-2">Duration: {contract.duration} months</p>
                    <p className="mb-2">Initial Amount: ₹{contract.initialPaymentAmount}</p>
                    <p className="font-semibold">Total Amount: ₹{totalAmount}</p>
                  </div>
                  <div className="flex-none">
                    {contract.productImage && (
                      <img
                        src={`data:image/jpeg;base64,${contract.productImage}`}
                        alt={contract.productName}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>No contracts available</div>
      )}

      {selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg w-[80%] md:w-[50%] relative text-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{capitalizeFirstLetter(selectedContract.productName)}</h2>
            <p className="mb-2 text-xl">Buyer Name: {selectedContract.BuyerName} </p>
            <p className="mb-2 ">
  Quantity: {selectedContract.productQuantity} q.{" "},
 @ ₹{((selectedContract.initialPaymentAmount + selectedContract.finalPaymentAmount) / selectedContract.productQuantity).toFixed(2)} /q
</p>
            <p className="mb-2">Duration: {selectedContract.duration} months</p>
            <p className="mb-2">Description: {selectedContract.productDescription}</p>
            <p className="mb-2">Initial Amount: ₹{selectedContract.initialPaymentAmount}</p>
            <p className="mb-2">Final Payment Amount: ₹{selectedContract.finalPaymentAmount}</p>
            <p className="font-semibold mb-4">Total Amount: ₹{selectedContract.initialPaymentAmount + selectedContract.finalPaymentAmount}</p>
            {selectedContract.productImage && (
              <img
                src={`data:image/jpeg;base64,${selectedContract.productImage}`}
                alt={selectedContract.productName}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPlaceBuyer;
