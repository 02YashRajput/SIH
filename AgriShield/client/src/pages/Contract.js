import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import OrderStatus from "../components/OrderStatus";
import { RxPerson } from "react-icons/rx";
import { FaRupeeSign } from "react-icons/fa";
import StatusUpdate from "../components/StatusUpdate";

const Contract = () => {
  const { setLoading, fetchData, pageData } = useContext(AppContext);
  const [waiting, setWaiting] = useState(true);
  const location = useLocation();
  const [index,setIndex] = useState(0);
  const [isVisible,setIsVisible] = useState(false)
  const [contractstatus,setContractStatus] = useState("Ongoing");

  const statusArray = [
    ["Initial Payment Pending", "Buyer"],
    ["Initial Payment Paid", "Farmer"],
    ["Initial Payment Received", "Default"],
    ["Product Delivery Pending", "Farmer"],
    ["Product Delivery Delivered", "Buyer"],
    ["Product Delivery Received", "Default"],
    ["Final Payment Pending", "Buyer"],
    ["Final Payment Paid", "Farmer"],
    ["Final Payment Received", "Default"],
  ];
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      await fetchData(`${location.pathname}?id=${id}`);
      setWaiting(false);
    };

    fetchDataAsync();
    // eslint-disable-next-line
  }, [location.pathname]);

  useEffect(() => {
    if (pageData.data && pageData.data.contract) {
      const currentStatus = pageData.data.contract.currentStatus;
      setContractStatus(pageData.data.contract.contractStatus);
      if (Array.isArray(currentStatus) && currentStatus.length >= 2) {
        const concat = currentStatus[0] + currentStatus[1];
        console.log(concat);
        
        const statsMatch = statusArray.findIndex((status) => status[0] === concat);
        
        setIndex(statsMatch);
      } 
    }
     // eslint-disable-next-line
  }, [pageData]);
  
  const clickHandler=()=>{
    setIsVisible(true);
  }

  return (
    <div class="relative pt-28 min-h-screen  flex  flex-col ">
      {waiting === true ? (
        <div class="w-full flex justify-center items-center h-screen">
          <Loading />{" "}
        </div>
      ) : (
        <div class="flex-grow ">
          {pageData.msg === "Contract not found" && navigate("/my-contracts")}
          {console.log(pageData)}

          <Header userName={pageData.data.user.name}></Header>
          <div class="max-w-[580px] w-full mx-auto mt-10 border-[2px] border-gray-300 px-20 py-10  shadow-lg rounded-xl">
            <div class="flex justify-between">
              <div class="flex items-end gap-5">
                <h1 class="text-4xl">Contract</h1>
                <p class="text-3xl">#{pageData.data.contract.ContractId}</p>
              </div>
              <span
                class={`text-2xl font-semibold   px-4 py-2 text-white rounded-full ${
                 contractstatus === "Ongoing"
                    ? "bg-yellow-300"
                    : "bg-green-500"
                } `}
              >
                {contractstatus}
              </span>
            </div>
            <div class="text-xl text-gray-600">
              {pageData.data.user.userType}:{pageData.data.user.name}
            </div>

            <div class="flex flex-col gap-8 text-2xl">
              <div class="mt-10  flex justify-between">
                {pageData.data.user.userType === "Farmer" ? (
                  <div class="flex">
                    <RxPerson />
                    Buyer :{" "}
                    <span class="text-gray-600">
                      {pageData.data.contract.BuyerName}
                    </span>
                  </div>
                ) : (
                  <div class="flex items-center">
                    <div class="gap-2 flex items-center">
                      <RxPerson /> Farmer :
                    </div>
                    <span class="text-gray-600">
                      {" "}
                      {pageData.data.contract.FarmerName}
                    </span>
                  </div>
                )}
                <div>
                  Product:{" "}
                  <span class="text-gray-600">
                    {" "}
                    {pageData.data.contract.productName}
                  </span>
                </div>
              </div>

              <div class="flex justify-between">
                <div>
                  Deadline :
                  <span class="text-gray-600">
                    {" "}
                    {new Date(
                      pageData.data.contract.deadline
                    ).toLocaleDateString("en-GB")}
                  </span>
                </div>

                <div>
                  Quantity :{" "}
                  <span class="text-gray-600">
                    {" "}
                    {pageData.data.contract.productAmount} q.
                  </span>
                </div>
              </div>
              <div class="flex flex-col gap-4">
                <h1 class="text-2xl flex items-center gap-2"><FaRupeeSign class="text-2xl"/> Payments Details :</h1>
                <div class="flex flex-col gap-3  translate-x-8  text-xl">
                  <p class="flex ">
                    Initial Payment :{" "}
                    <span class="text-gray-600 flex items-center">
                      {" "}
                      <FaRupeeSign />{" "}
                      {pageData.data.contract.initialPaymentAmount}
                    </span>
                  </p>
                  <p class="flex ">
                    Final Payment :{" "}
                    <span class="text-gray-600 flex items-center">
                      {" "}
                      <FaRupeeSign />{" "}
                      {pageData.data.contract.finalPaymentAmount}
                    </span>
                  </p>
                  <p class="flex ">
                    Total Payment :{" "}
                    <span class="text-gray-600 flex items-center">
                      {" "}
                      <FaRupeeSign />{" "}
                      {pageData.data.contract.initialPaymentAmount +
                        pageData.data.contract.finalPaymentAmount}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <OrderStatus userType = {pageData.data.user.userType} currentStatusIndex={index} statusArray={statusArray} />
            </div>
{
   statusArray[index][1] === pageData.data.user.userType &&
            <div class="flex justify-center items-center ">
                <button class="py-2 bg-green-500 w-full rounded-lg text-xl font-semibold text-white" onClick={clickHandler}>
                  Update Status  
                  </button>

              </div>
}

          </div>
        </div>
      )}

      
                        {
                    isVisible && statusArray[index][1] === pageData.data.user.userType && 
                    <StatusUpdate index={index} setIndex={setIndex} statusArray={statusArray} setContractStatus= {setContractStatus} id={id} setIsVisible={setIsVisible} />
                  }
      <Footer />
    </div>
  );
};

export default Contract;
