import React from "react";
import logo from "../utils/AgriShieldTransparent.png";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useState,useEffect } from "react"; 
import { IoMenuSharp } from "react-icons/io5";
import { IoDocumentLockSharp } from "react-icons/io5";

const Header = ({ userName }) => {
  const [showMenu,setShowMenu] = useState(false);
  const toogleFunc = ()=>{
    setShowMenu(!showMenu);
  }

  const navigate = useNavigate();
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className={`fixed top-0 text-xl bg-green-200 left-0 w-full h-28 z-50 flex items-center transition-shadow duration-300 justify-between px-5 ${hasShadow? "shadow-lg":""}`}>
      {/* Logo Section  */}
      <div
        onClick={() => {
          navigate(`/dashboard`);
        }}
      >
        <img src={logo} alt="AgriShield Logo" className="h-24 object-contain" />
      </div>

      <div class="font-bold text-3xl hidden lg:block ">Hi, {userName}</div>

      {/* Search section */}
      <form class="flex items-center justify-between  border  border-gray-300 rounded-lg shadow-sm w-[40%] max-w-[30rem]  " onSubmit={(e)=>{
        e.preventDefault();
      }}>
        <input
          type="search"
          placeholder="Search..."
          class="w-full h-[3rem]  px-4 py-2 outline-none"
        />
        <button className="px-5 py-2 h-full bg-gray-300 rounded-lg rounded-l-none">

        <CiSearch class="text-4xl " />
        </button>
      </form>

      {/* navigation Section */}
        <div className="relative flex justify-center items-center" >
          <button onClick={toogleFunc}>

            <IoMenuSharp className="md:hidden text-4xl"/>
          </button>
        
      <nav className={`  absolute  top-12 right-0  md:flex md:top-0 md:relative ${showMenu ? "" : "hidden"} `}>
        <ul className="flex flex-col md:flex md:flex-row md:gap-8">
          <li
            className="flex items-center gap-1  cursor-pointer  hover:text-yellow-700 m-1 md:m-0"
            onClick={() => {
              navigate(`/dashboard`);
            }}
          >
            <FaHome /> Home
          </li>
          <li
            className="flex  items-center gap-1  cursor-pointer  hover:text-yellow-700 m-1 md:m-0"
            onClick={() => {
              // navigate(`/market-place`);
            }}
          >
            <FaStore /> MarketPlace
          </li>
          <li
            className="flex  items-center gap-1  cursor-pointer  hover:text-yellow-700 m-1 md:m-0"
            onClick={() => {
              // navigate(`/my-contracts`);
            }}
          >
            <IoDocumentLockSharp/>My Contracts
          </li>
          <li
            className="flex items-center gap-1  cursor-pointer  hover:text-yellow-700 m-1 md:m-0"
            onClick={() => {
              navigate(`/contact-us`);
            }}
          >
            <FaPhoneAlt /> Contact Us
          </li>
            {/* Profile */}
            <li
          className="flex items-center gap-2 cursor-pointer  hover:text-yellow-700 m-1 md:m-0"
          onClick={() => {
            navigate(`/profile`);
          }}
        >
          <FaUser />
          Profile
        </li>
        </ul>
      </nav>
      </div>


    </div>
  );
};

export default Header;
