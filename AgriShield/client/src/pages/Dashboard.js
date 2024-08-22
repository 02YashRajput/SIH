import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import DashboardVideo from "../utils/Dashboard_bg.mp4"
import Footer from "../components/Footer";
const Dashboard = () => {
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
    <div className="relative pt-28 min-h-screen  ">
      {waiting === true ? (
        <div className="w-full flex justify-center items-center h-screen">
          <Loading />{" "}
        </div>
      ) : (
        <div className="">
          {console.log(pageData)}
          <Header userName={pageData.data.user.name}></Header>

          <video className="h-screen w-full object-cover" autoPlay loop muted>
            <source src={DashboardVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Dashboard;
