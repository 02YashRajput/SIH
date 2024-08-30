import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation,useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import MarketPlaceBuyer from "../components/MarketPlaceBuyer";
import MarketPlaceFarmer from "../components/MarketPlaceFarmer.mjs";
import { toast } from "react-toastify";
const MarketPlace = () => {
  const { setLoading, fetchData, pageData } = useContext(AppContext);
  const [waiting, setWaiting] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      await fetchData(location.pathname);
      try {
        const response = await fetch("/api/market-place/profile",{
          headers: {
            'ngrok-skip-browser-warning': 'any-value'
          }});
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      
        const data = await response.json();
        console.log(data);
        if(data.msg === "No"){
          navigate("/profile");
          toast.error("Please complete your Paymet Information First")
        }
      } catch (err) {
        console.log("An error occurred:", err.message);
      }
      setWaiting(false);
    };

    fetchDataAsync();
    // eslint-disable-next-line
  }, [location.pathname]);

  const refetchData = async () => {
    setWaiting(true);
    await fetchData(location.pathname);
    setWaiting(false);
  };
  return (
    <div class="relative pt-28 min-h-screen  flex flex-col ">
      {waiting === true ? (
        <div class="w-full flex justify-center items-center h-screen">
          <Loading />{" "}
        </div>
      ) : (
        <div class="flex-grow mt-10 relative ">
          {console.log(pageData)}
          <Header userName={pageData.data.user.name}></Header>
          {
            pageData.data.user.userType === "Buyer" ? (<div class="w-full ">
              <MarketPlaceBuyer listedContracts = {pageData.data.listedContracts}  refetchData = {refetchData}/>
            </div>):(<div class="w-full"><MarketPlaceFarmer  listedContracts = {pageData.data.listedContracts} /></div>)
          }
          
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default MarketPlace;
