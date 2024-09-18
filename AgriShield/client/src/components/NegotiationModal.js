import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import {  useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { IoIosSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import Avatar from "../utils/profile.png"
const NegotiationModal = ({ isOpen, onClose, contract, userType }) => {
  const [isNegotiationOpen, setIsNegotiationOpen] = useState(false); // State for negotiation popup
  const [proposedAmount, setProposedAmount] = useState(""); // Input field state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");
  const {setPageData,pageData}   = useContext(AppContext);
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate()

  console.log({contract})

  const onReject = async () => {
    console.log("reject called")
    try {
      const res = await axios.post("/api/negotiations/reject", contract);
      if (res.status === 200) {
        toast.success("Contract rejected successfully:", res.data);
        
        onClose();
        const updatedPageData = {
          ...pageData,
          data: {
            ...pageData.data,
            negotiations: pageData.data.negotiations.filter(
              (con) => con._id !== contract._id
            ),
          },
        };
  
        // Update the pageData state with the filtered negotiations
        setPageData(updatedPageData);
        // Handle success (e.g., update UI, show message)
      } else {
        toast.error("Failed to reject the contract:", res.data);
        // Handle failure (e.g., show error message)
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error (e.g., show error message to user)
    }
  };
  

  const editHandler = () => {
    // Prefill the modal with existing contract data
    setProposedAmount(
      userType === "Farmer"
        ? contract.initialPaymentAmountFarmer
        : contract.initialPaymentAmountBuyer || ""
    );
    setTotalAmount(
      userType === "Farmer"
        ? contract.finalPaymentAmountFarmer +
            contract.initialPaymentAmountFarmer
        : contract.finalPaymentAmountBuyer +
            contract.initialPaymentAmountBuyer || ""
    );
    setQuantity(
      userType === "Farmer"
        ? contract.productQuantityFarmer
        : contract.productQuantityBuyer || ""
    );
    // Open the negotiation modal
    setIsNegotiationOpen(true);
  };

  const handleNegotiationSubmit = async () => {
    try {
      if (userType === "Farmer") {
        contract.initialPaymentAmountFarmer = proposedAmount;
        contract.finalPaymentAmountFarmer = totalAmount - proposedAmount;
        contract.productQuantityFarmer = quantity;
        contract.lastUpdated = "Farmer";
      } else {
        contract.initialPaymentAmountBuyer = proposedAmount;
        contract.finalPaymentAmountBuyer = totalAmount - proposedAmount;
        contract.productQuantityBuyer = quantity;
        contract.lastUpdated = "Buyer";
      }
      const response = await axios.post("/api/negotiations", contract,
        {
          headers: {
            'ngrok-skip-browser-warning': 'any-value'
          }}   );
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle success
      toast.success("Negotiation updated successfully");

      setProposedAmount("");
      setTotalAmount("");
      setQuantity("");
      // Close the popup after submission
      setIsNegotiationOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Error Occured", err);
    }
  };

  if (!isOpen || !contract) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      {console.log(contract)}  
      <div className="bg-white p-8 rounded-lg shadow-lg   relative flex gap-5">
        <div className="w-[30rem]">

        <button onClick={onClose} className="absolute top-10 right-10 text-2xl"><IoMdClose/></button>
        
        <h2 className="text-3xl font-semibold text-center mb-6">
          Negotiation Details
        </h2>
        <div className="space-y-4">
          {/* Contract details */}
          <div className="flex justify-between">
            <span className="font-medium">Buyer Name:</span>
            <span>{contract.BuyerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Farmer Name:</span>
            <span>{contract.FarmerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Product Name:</span>
            <span>{contract.productName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Duration:</span>
            <span>{contract.duration} months</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Quantity (Buyer):</span>
            <span>{contract.productQuantityBuyer}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Quantity (Farmer):</span>
            <span>{contract.productQuantityFarmer}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Initial Payment (Buyer):</span>
            <span>₹{contract.initialPaymentAmountBuyer}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Initial Payment (Farmer):</span>
            <span>₹{contract.initialPaymentAmountFarmer}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Final Payment (Buyer):</span>
            <span>₹{contract.finalPaymentAmountBuyer}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Final Payment (Farmer):</span>
            <span>₹{contract.finalPaymentAmountFarmer}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Payment (Buyer):</span>
            <span>
              ₹
              {contract.finalPaymentAmountBuyer +
                contract.initialPaymentAmountBuyer}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Payment (Farmer):</span>
            <span>
              ₹
              {contract.finalPaymentAmountFarmer +
                contract.initialPaymentAmountFarmer}
            </span>
          </div>
        </div>

        <div className="flex gap-10 justify-center mt-6">
          <button
            onClick={editHandler}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Edit
          </button>
          <button
            onClick={()=>{setIsChatOpen(!isChatOpen)}}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Chat
          </button>

          {contract.lastUpdated !== userType &&(
          <button
            onClick={onReject}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Reject
          </button>
)}
          {contract.lastUpdated !== userType && (
            <button
              onClick={async()=>{
             
                try{

                  const res = await axios.post("/api/negotiations/make-contract",contract,
                    {
                      headers: {
                        'ngrok-skip-browser-warning': 'any-value'
                      }}   );
                    if(res.status!==201){
                      toast.error("request Failed");
                    }else{

                      toast.success("Contract has been made successfully!");
                      navigate("/my-contracts");
                    }
                    
                  
                }catch(err){
                  toast.error("An error Occured");
                  
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Activate
            </button>
          )}
        </div>
        </div>
          {
            isChatOpen && (
              <div className="flex items-center">
              <div className="h-full w-[1px] bg-black"></div>
              <div className="w-[30rem] m-10 bg-slate-200 flex flex-col p-5 rounded-lg shadow-lg h-full justify-between">
                <div className="flex  items-center mb-4 gap-5">
                  <img src={Avatar} className="h-10 w-10 rounded-full mb-2" />
                  <div className="text-lg font-semibold">
                   To {userType === "Farmer" ? contract.BuyerName : contract.FarmerName}
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="bg-white h-10 border-[1px] border-slate-300 rounded-lg px-4 flex-grow shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                  />
                  <IoIosSend className="text-4xl text-blue-600 cursor-pointer hover:text-blue-800 transition duration-200" />
                </div>
              </div>
            </div>
            
            )
          }
      </div>

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
                Proposed Initial Amount ₹
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
  );
};

export default NegotiationModal;