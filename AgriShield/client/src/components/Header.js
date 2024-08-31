import React from "react";
import logo from "../utils/AgriShieldTransparent.png";
import { useNavigate } from "react-router-dom";
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
    <div class={`fixed top-0 text-xl bg-green-200 left-0 w-full h-28 z-50 flex items-center transition-shadow duration-300 justify-between px-5 ${hasShadow? "shadow-lg":""}`}>
      {/* Logo Section  */}
      <div
        onClick={() => {
          navigate(`/dashboard`);
        }}
      >
        <img src={logo} alt="AgriShield Logo" class="h-24 cursor-pointer object-contain" />
      </div>

      <div class="font-bold text-3xl hidden lg:block mr-auto ml-10">Hi, {userName}</div>

    

      {/* navigation Section */}
        <div class="relative flex justify-center items-center" >
          <button onClick={toogleFunc}>

            <IoMenuSharp class="md:hidden text-4xl"/>
          </button>
        
      <nav class={`  absolute  top-12 right-0  md:flex md:top-0 md:relative ${showMenu ? "" : "hidden"} `}>
        <ul class="flex flex-col md:flex md:flex-row md:gap-8">
          <li
            class="flex items-center gap-1  cursor-pointer  hover:text-yellow-700 m-1 md:m-0"
            onClick={() => {
              navigate(`/dashboard`);
            }}
          >
            <FaHome /> Home
          </li>
          <li
            class="flex  items-center gap-1  cursor-pointer  hover:text-yellow-700 m-1 md:m-0"
            onClick={() => {
              navigate(`/market-place`);
            }}
          >
            <FaStore /> MarketPlace
          </li>
          <li
            class="flex  items-center gap-1  cursor-pointer  hover:text-yellow-700 m-1 md:m-0"
            onClick={() => {
              navigate(`/my-contracts`);
            }}
          >
            <IoDocumentLockSharp/>My Contracts
          </li>
          <li
            class="flex  items-center gap-1  cursor-pointer  hover:text-yellow-700 m-1 md:m-0"
            onClick={() => {
              navigate(`/negotiations`);
            }}
          >
            <IoDocumentLockSharp/>My Negotiations
          </li>
          <li class="flex items-center gap-1 cursor-pointer hover:text-yellow-700 m-1 md:m-0">
  <a href="https://8077-103-177-203-130.ngrok-free.app/" target="_blank" class="flex items-center gap-1">
    <IoDocumentLockSharp />
    Price Predictor
  </a>
</li>

          <li
            class="flex items-center gap-1  cursor-pointer  hover:text-yellow-700 m-1 md:m-0"
            onClick={() => {
              navigate(`/contact-us`);
            }}
          >
            <FaPhoneAlt /> Contact Us
          </li>
            {/* Profile */}
            <li
          class
          ="flex items-center gap-2 cursor-pointer  hover:text-yellow-700 m-1 md:m-0"
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
