import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import TableNegoComponent from "../components/TableNegoComponent.mjs";
const Negotiations = () => {
  const { setLoading, fetchData, pageData } = useContext(AppContext);
  const [waiting, setWaiting] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      await fetchData(location.pathname);
      
      setWaiting(false);
    };

    fetchDataAsync();
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <div class="relative pt-28 min-h-screen  flex flex-col ">
      {waiting === true ? (
        <div class="w-full flex justify-center items-center h-screen">
          <Loading />{" "}
        </div>
      ) : (
        <div class="flex-grow flex justify-center items-center">
          <Header userName={pageData.data.user.name}></Header>
          {console.log(pageData)}
          {
            pageData.data.negotiations.length === 0 ?(<div class="text-3xl ">
              No Negotiations, Go to{" "}
              <a class="text-blue-800 underline" href="/market-place">
                MarketPlace{" "}
              </a>{" "}
            </div>):(<div class="mt-5">
            <div class="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-lg">
            <h2 class="text-2xl font-semibold mb-2">Ongoing Negotiations</h2>
              <p class="text-gray-600 mb-4">View the status of your active negotiations.</p>
              <TableNegoComponent data={pageData.data.negotiations} userType={pageData.data.user.userType} /> 


              </div>

            </div>)
          }


        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Negotiations;
