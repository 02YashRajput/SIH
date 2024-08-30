import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation} from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import TableComponent from "../components/TableComponent";
const MyContracts = () => {
  const { setLoading, fetchData, pageData } = useContext(AppContext);
  const [waiting, setWaiting] = useState(true);
  const location = useLocation();
  const[ongoingContracts,setOngoingContracts] = useState([]);
  const [completedContracts,setCompletedContracts] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      await fetchData(location.pathname);

      setWaiting(false);
    };

    fetchDataAsync();
    // eslint-disable-next-line
  }, [location.pathname]);

  useEffect(() => {
    if (!waiting && pageData.data && pageData.data.contracts) {
      // Filter and sort contracts based on paymentStatus, deliveryStatus, and deadline
      const ongoing = pageData.data.contracts
        .filter((contract) => contract.contractStatus === "Ongoing")
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  
   
      const completed = pageData.data.contracts
        .filter(
          (contract) =>
            
            contract.contractStatus === "Completed"
        )
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  
      // Update the state with the filtered and sorted contracts
        setOngoingContracts(ongoing);
      setCompletedContracts(completed);
    }
  }, [waiting, pageData]);
  


  return (
    <div class="relative pt-28 min-h-screen  flex flex-col ">
      {waiting === true ? (
        <div class="w-full flex justify-center items-center h-screen">
          <Loading />{" "}
        </div>
      ) : (
        <div class="flex-grow flex justify-center items-center ">
          <Header userName={pageData.data.user.name}></Header>
          {pageData.data.contracts.length === 0 ? (
            <div class="text-3xl ">
              No Contracts, Go to{" "}
              <a class="text-blue-800 underline" href="/market-place">
                MarketPlace{" "}
              </a>{" "}
            </div>
          ) : (<div class="mt-5">
            <div class="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-lg">
              
              
              
              {ongoingContracts.length === 0 ? (
                <div class="text-gray-500 italic">No Ongoing contracts.</div>
              ) : (
                <div>
                  <h2 class="text-2xl font-semibold mb-2">Ongoing Contracts</h2>
              <p class="text-gray-600 mb-4">View the status of your active contracts.</p>

                  <TableComponent data={ongoingContracts} status="Ongoing" />
                </div>
              )}
            </div>
            
            <div class="mt-5">
              {completedContracts.length === 0 ? (
                <div class="text-gray-500 italic">No completed contracts.</div>
              ) : (
                <div class="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-lg">
                  <h2 class="text-2xl font-semibold mb-2">Completed Contracts</h2>
              <p class="text-gray-600 mb-4">View all of your contracts.</p>

                  <TableComponent data={completedContracts} status="Completed" />
                </div>
              )}
            </div>
          </div>
          
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MyContracts;
