import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
// Helper function to calculate distance between two points (latitude and longitude)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const MarketPlaceFarmer = (props) => {
  
  const [isNegotiationOpen, setIsNegotiationOpen] = useState(false); // State for negotiation popup
  const [proposedAmount, setProposedAmount] = useState(""); // Input field state
  const [totalAmount, setTotalAmount] = useState("");
  const [quantity, setQuantity] = useState("");

  const negotiateHandler = () => {
    setIsNegotiationOpen(true); // Show negotiation popup
  };

  const handleNegotiationSubmit = async() => {

    const contract = {};
    contract.BuyerId = selectedContract.BuyerId;
    contract.BuyerName = selectedContract.BuyerName;
    contract.productName = selectedContract.productName;
    contract.productQuantityBuyer = selectedContract.productQuantity;
    contract.duration = selectedContract.duration;
    contract.initialPaymentAmountBuyer = selectedContract.initialPaymentAmount;
    contract.finalPaymentAmountBuyer = selectedContract.finalPaymentAmount;
    contract.initialPaymentAmountFarmer =proposedAmount;
    contract.finalPaymentAmountFarmer = totalAmount-proposedAmount;
    contract.productQuantityFarmer = quantity;
    contract.lastUpdated = "Farmer";
    contract.MarketPlaceId = selectedContract._id


    try{
      console.log(contract);
      const response = await axios.post("/api/negotiations/initial", contract ,
        {
          headers: {
            'ngrok-skip-browser-warning': 'any-value'
          }}   );
      if (response.status !== 201) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Handle success
      toast.success("Negotiation activated successfully");
      
      setProposedAmount("");
      setTotalAmount("");
      setQuantity("");
      // Close the popup after submission
      setIsNegotiationOpen(false);
      // Remove the contract from the listedContracts
      navigate("/negotiations")
    }catch(err){
      toast.error(`Error activating contract: ${err.message}`);
    }

  };
  const [listedContracts, setListedContracts] = useState(props.listedContracts);
  const [selectedContract, setSelectedContract] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(""); // State for selected crop
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const navigate = useNavigate();
const activateHandler = async () => {
  if (!selectedContract) {
    console.error("No contract selected");
    return;
  }

  try {
    delete selectedContract.productImage;
    console.log(selectedContract);

    const response = await axios.post("/api/market-place/make-contract", selectedContract,
      {
        headers: {
          'ngrok-skip-browser-warning': 'any-value'
        }}    );

    if (response.status !== 201) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle success
    toast.success("Contract activated successfully");
    
    // Remove the contract from the listedContracts
    navigate("/my-contracts")

    // Clear the selected contract
    
  } catch (error) {
    toast.error(`Error activating contract: ${error.message}`);
    // Handle error (e.g., show an error message)
  }
};
  
  useEffect(() => {
    // Request location access
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          // Handle error or location access denial
          console.error("Error getting location", error);
          // You might want to handle the error state here
        }
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      // Sort contracts based on distance from the user's location
      const sortedContracts = [...listedContracts].sort((a, b) => {
        const distanceA = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          a.location.lat,
          a.location.lon
        );
        const distanceB = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          b.location.lat,
          b.location.lon
        );
        return distanceA - distanceB;
      });
      setListedContracts(sortedContracts);
    }
  }, [userLocation]);

  useEffect(() => {
    // Filter contracts based on the selected crop
    if (selectedCrop) {
      if (selectedCrop === "none") {
        setListedContracts(props.listedContracts);
      } else {
        const filteredContracts = props.listedContracts.filter(
          (contract) =>
            contract.productName.toLowerCase() === selectedCrop.toLowerCase()
        );
        setListedContracts(filteredContracts);
      }
    } else {
      setListedContracts(props.listedContracts); // Reset to original list if no filter is selected
    }
  }, [selectedCrop, props.listedContracts]);

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const crops = [
    "none",
    "arhar",
    "bajra",
    "barley",
    "copra",
    "cotton",
    "gram",
    "groundnut",
    "jowar",
    "jute",
    "maize",
    "masoor",
    "moong",
    "niger",
    "paddy",
    "ragi",
    "rape",
    "safflower",
    "sesamum",
    "soyabean",
    "sugarcane",
    "sunflower",
    "urad",
    "wheat",
  ];

  const handleContractClick = (contract) => {
    setSelectedContract(contract);
  };

  const handleCloseModal = () => {
    setSelectedContract(null);
  };

  const handleFilterClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCropSelect = (crop) => {
    setSelectedCrop(crop);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-20 justify-center items-center">
      <div className="w-[60%] px-20 py-10 border-[2px] border-gray-300 shadow-lg">
        {console.log("selected contract",selectedContract)}
        <div className="relative mb-6">
          <button
            onClick={handleFilterClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Filter by Crop
          </button>
          {isDropdownOpen && (
            <div
              className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {crops.length > 0 ? (
                crops.map((crop, index) => (
                  <button
                    key={index}
                    onClick={() => handleCropSelect(crop)}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  >
                    {capitalizeFirstLetter(crop)}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">
                  No crops available
                </div>
              )}
            </div>
          )}
        </div>

        {listedContracts.length > 0 ? (
          <div>
            <h1 className="text-3xl font-bold mb-6">Listed Contracts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {listedContracts.map((contract, index) => {
                const totalAmount =
                  contract.initialPaymentAmount + contract.finalPaymentAmount;

                return (
                  <div
                    key={index}
                    className="flex p-4 border rounded-lg shadow-md cursor-pointer"
                    onClick={() => handleContractClick(contract)}
                  >
                    <div className="flex-1 pr-4">
                      <h2 className="text-xl font-semibold mb-2 capitalize">
                        {capitalizeFirstLetter(contract.productName)}
                      </h2>
                      <p className="mb-2">
                        Quantity: {contract.productQuantity} q.{" "}
                      </p>
                      <p className="mb-2">
                        Duration: {contract.duration} months
                      </p>
                      <p className="mb-2">
                        Initial Amount: ₹{contract.initialPaymentAmount}
                      </p>
                      <p className="font-semibold">
                        Total Amount: ₹{totalAmount}
                      </p>
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
              <h2 className="text-2xl font-bold mb-4">
                {capitalizeFirstLetter(selectedContract.productName)}
              </h2>
              <p className="mb-2 text-xl">
                Buyer Name: {selectedContract.BuyerName}{" "}
              </p>
              <p className="mb-2">
                Quantity: {selectedContract.productQuantity} q. , @ ₹
                {(
                  (selectedContract.initialPaymentAmount +
                    selectedContract.finalPaymentAmount) /
                  selectedContract.productQuantity
                ).toFixed(2)}{" "}
                /q
              </p>

              <p className="mb-2">
                Duration: {selectedContract.duration} months
              </p>
              <p className="mb-2">
                Description: {selectedContract.productDescription}
              </p>
              <p className="mb-2">
                Initial Amount: ₹{selectedContract.initialPaymentAmount}
              </p>
              <p className="mb-2">
                Final Payment Amount: ₹{selectedContract.finalPaymentAmount}
              </p>
              <p className="font-semibold mb-4">
                Total Amount: ₹
                {selectedContract.initialPaymentAmount +
                  selectedContract.finalPaymentAmount}
              </p>
              {selectedContract.productImage && (
                <img
                  src={`data:image/jpeg;base64,${selectedContract.productImage}`}
                  alt={selectedContract.productName}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              <div className="flex gap-5 text-xl mt-5 ">
              <button className="bg-blue-500 px-4 py-2 rounded-lg " onClick={negotiateHandler}>Negotiate</button>
              <button className="bg-green-500 px-4 py-2 rounded-lg " onClick={activateHandler}>Activate</button>
                </div>
            </div>
          </div>
        )}
                {isNegotiationOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-10 rounded-lg shadow-lg w-[80%] md:w-[50%] relative">
              <button
                onClick={() => setIsNegotiationOpen(false)}
                className="absolute top-4 right-4 text-xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">Negotiate Contract</h2>
              <div className="mb-4">
                <label
                  htmlFor="proposedAmount"
                  className="block text-lg font-semibold mb-2"
                >
                  Proposed Initial Amount₹
                </label>
                <input
                  id="proposedAmount"
                  type="text"
                  placeholder="₹100"
                  value={proposedAmount}
                  onChange={(e) => setProposedAmount(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="totalAmount"
                  className="block text-lg font-semibold mb-2"
                >
                  Total Amount ₹
                </label>
                <input
                  id="totalAmount"
                  type="text"
                  placeholder="₹1000"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-lg font-semibold mb-2"
                >
                  Quantity (q.)
                </label>
                <input
                  id="quantity"
                  placeholder="20q."
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleNegotiationSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPlaceFarmer;
