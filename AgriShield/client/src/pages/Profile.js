import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import ProfilePhoto from "../components/ProfilePhoto";
import axios from "axios";
import { toast } from "react-toastify";
import ChangePasswordPopup from "../components/ChangePasswordPopup"; 
import LogoutPopup from "../components/LogoutPopup";

const Profile = () => {
  const { setLoading, fetchData, pageData, setPageData } =
    useContext(AppContext);
  const [waiting, setWaiting] = useState(true);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const location = useLocation();
  const desiredOrder = ["name", "email", "phone", "address"];
  const [isEditable, setIsEditable] = useState(false);

  const handleMyProfileChange = (e) => {
    setPageData({
      ...pageData,
      data: {
        ...pageData.data,
        myprofile: {
          ...pageData.data.myprofile,
          [e.target.name]: e.target.value,
        },
      },
    });
  };
  const handleFarmDetailsChange = (e) => {
    setPageData({
      ...pageData,
      data: {
        ...pageData.data,
        farmDetails: {
          ...pageData.data.farmDetails,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  const handleBankDetailsChange = (e) => {
    setPageData({
      ...pageData,
      data: {
        ...pageData.data,
        paymentInformation: {
          ...pageData.data.paymentInformation,
          bankDetails: {
            ...pageData.data.paymentInformation.bankDetails,
            [e.target.name]: e.target.value,
          },
        },
      },
    });
  };
  const handleUpiDetailChange = (e) => {
    setPageData({
      ...pageData,
      data: {
        ...pageData.data,
        paymentInformation: {
          ...pageData.data.paymentInformation,
          upiDetails: {
            ...pageData.data.paymentInformation.upiDetails,
            [e.target.name]: e.target.value,
          },
        },
      },
    });
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      try {
        await fetchData(location.pathname);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setWaiting(false);
      }
    };

    fetchDataAsync();
  }, [location.pathname]);

  return (
    <div className="relative pt-28 min-h-screen flex flex-col">
      {waiting ? (
        <div className="w-full flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <>
          {console.log(pageData)}
          <Header userName={pageData?.data?.myprofile?.name || "User"} />
          <div className="flex-grow flex justify-center items-center mt-20">
            <div className="bg-green-100 py-20 w-full max-w-[70%] flex-grow flex justify-center items-center shadow-2xl">
              <div className="bg-white w-1/2 p-10 flex flex-col justify-center items-center rounded-lg shadow-lg">
                <h1 className="text-5xl text-gray-500">Profile</h1>
                <div className="mt-5 w-1/6 h-[2px] bg-blue-700"></div>
                <ProfilePhoto
                  myPhoto={pageData?.data?.myprofile?.photo || ""}
                />
                <div className="mt-10 w-full">
                  <div className="border-t border-gray-300 mt-5 pt-5">
                    <h2 className="text-2xl text-gray-700">User Information</h2>
                    <div className="mt-2 text-gray-600">
                      {Object.entries(pageData?.data?.myprofile || {})
                        .filter(
                          ([key]) => key !== "photo" && key !== "userType"
                        )
                        .sort(([keyA], [keyB]) => {
                          const indexA = desiredOrder.indexOf(keyA);
                          const indexB = desiredOrder.indexOf(keyB);
                          return (
                            (indexA === -1 ? desiredOrder.length : indexA) -
                            (indexB === -1 ? desiredOrder.length : indexB)
                          );
                        })
                        .map(([key, value]) => (
                          <label key={key} className="block mb-2">
                            <span className="text-gray-700">
                              {capitalizeFirstLetter(key)}:
                            </span>
                            <input
                              type="text"
                              name={key}
                              value={value}
                              onChange={handleMyProfileChange}
                              disabled={!isEditable}
                              className="mt-1 block w-full outline-none border-[1px] border-slate-300 rounded-md shadow-sm"
                            />
                          </label>
                        ))}
                    </div>
                  </div>
                  <div className="border-t text-gray-700 border-gray-300 mt-5 pt-5">
                    <h1 className="text-2xl ">Payment Information</h1>
                    <div className="ml-5 mt-5">
                      <h2 className="text-xl ">Bank Details</h2>
                      <div className="mt-2 text-gray-600">
                        {Object.entries(
                          pageData.data.paymentInformation.bankDetails || {}
                        )
                        .map(([key, value]) => (
                          <label key={key} className="block mb-2">
                            <span className="text-gray-700">
                              {capitalizeFirstLetter(key)}:
                            </span>
                            <input
                              type="text"
                              name={key}
                              value={value}
                              onChange={handleBankDetailsChange}
                              disabled={!isEditable}
                              className="mt-1 block w-full outline-none border-[1px] border-slate-300 rounded-md shadow-sm"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="ml-5 mt-5">
                      <h2 className="text-xl ">Upi Details</h2>
                      <div className="mt-2 text-gray-600">
                        {Object.entries(
                          pageData.data.paymentInformation.upiDetails || {}
                        )
                        .map(([key, value]) => (
                          <label key={key} className="block mb-2">
                            <span className="text-gray-700">
                              {capitalizeFirstLetter(key)}:
                            </span>
                            <input
                              type="text"
                              name={key}
                              value={value}
                              onChange={handleUpiDetailChange}
                              disabled={!isEditable}
                              className="mt-1 block w-full outline-none border-[1px] border-slate-300 rounded-md shadow-sm"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  {
                    pageData.data.myprofile.userType === "Farmer" &&
                    <div className="border-t border-gray-300 mt-5 pt-5">
                      <h2 className="text-2xl text-gray-700">Farm Details</h2>
                      <div className="mt-2 text-gray-600">
                        {Object.entries(pageData?.data?.farmDetails || {})
                          .map(([key, value]) => (
                            <label key={key} className="block mb-2">
                              <span className="text-gray-700">
                                {capitalizeFirstLetter(key)}:
                              </span>
                              <input
                                type="text"
                                name={key}
                                value={Array.isArray(value)? value.join(","): value}
                                onChange={handleFarmDetailsChange}
                                disabled={!isEditable}
                                className="mt-1 block w-full outline-none border-[1px] border-slate-300 rounded-md shadow-sm"
                              />
                            </label>
                          ))}
                      </div>
                      <div className="border-t border-gray-300 mt-5 pt-5">
                        <h2 className="text-2xl text-gray-700">Notification Preference</h2>
                        <select
                          name="notificationPreference"
                          value={pageData.data.notificationPreference || "on"}
                          onChange={(e) => {
                            setPageData(prevData => ({
                              ...prevData,
                              data:{
                                ...prevData.data,
                                notificationPreference: e.target.value
                              }
                            }));
                          }}
                          disabled={!isEditable}
                          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm"
                        >
                          <option value="on">Enabled</option>
                          <option value="off">Disabled</option>
                        </select>
                      </div>
                    </div>
                  }
                </div>
                <div className="mt-5 flex space-x-4">
                  {isEditable ? (
                    <>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                          setIsEditable(false);
                          // Add code to save changes here
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        onClick={() => setIsEditable(false)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      onClick={() => setIsEditable(true)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setIsLogoutOpen(true)}
                  >
                    Logout
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setIsChangePasswordOpen(true)}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
      {isChangePasswordOpen && (
        <ChangePasswordPopup onClose={() => setIsChangePasswordOpen(false)} />
      )}
      {isLogoutOpen && <LogoutPopup onClose={() => setIsLogoutOpen(false)} />}
    </div>
  );
};

export default Profile;
