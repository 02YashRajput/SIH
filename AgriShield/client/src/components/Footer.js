import React from 'react';
import logo from  "../utils/AgriShieldTransparent.png";
import { useNavigate } from 'react-router-dom';
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div class='flex items-center justify-evenly bg-green-200 mt-20 md:px-10 py-10 gap-10 text-gray-700 text-xl   flex-col md:flex-row '>
      <div class='flex  justify-center items-center gap-10'>

      <div>
        
        <img src={logo} alt='Logo' class='h-[10rem]' />
      </div>
      <div class='w-[25rem] text-gray-700 text-xl'>
      A platform connecting farmers with guaranteed buyers through secure contracts, ensuring stable market access and reliable income.
      </div>
      </div>
      <nav class=' flex flex-col gap-3 text-xl '>
        <h1 class='text-2xl'>Navigation</h1>
        <ul class='flex flex-col gap-2   '>

        <li class='hover:text-yellow-700 transition-all duration-200'
         onClick={()=>{
          navigate("/about");
        }}>
          About
        </li>
        <li class='hover:text-yellow-700 transition-all duration-200' onClick={()=>{
          navigate("/contact-us");
        }}>
          Contact Us
        </li>
        <li class='hover:text-yellow-700 transition-all duration-200' onClick={()=>{
          navigate("/products");
        }}>
          Products
        </li>
        <li class='hover:text-yellow-700 transition-all duration-200' onClick={()=>{
          navigate("/privacy-policy");
        }}>
          Privacy Policy
        </li>
        </ul>

      </nav>
      <div class='w-[20rem]'>
        <h1 class='text-2xl'>
          Address
        </h1>
          <p>
            Noida Intitute of Engineering & Technology,
            <br/>
            Greater Noida,Gautam Buddha Nagar,
            <br/>
            Uttar Pradesh, 201301, India
          </p>

        </div>

        <div class="mt-10 text-4xl flex flex-col gap-8">
          <h1>Follow Us</h1>
          <div class
          
          ='flex gap-8'>

                <button
                  onClick={() => {
                    window.open(
                      "https://www.instagram.com/agri_shield",
                      "_blank"
                    );
                  }}
                >
                  <FaSquareInstagram />
                </button>
                <button
                  onClick={() => {
                    window.open(
                      "https://www.facebook.com/profile.php?id=61564286236744",
                      "_blank"
                    );
                  }}
                >
                  <FaFacebookSquare />
                </button>
                <button
                  onClick={() => {
                    window.open(
                      "https://www.twitter.com/agri_shield",
                      "_blank"
                    );
                  }}
                >
                  <FaSquareXTwitter />
                </button>
          </div>

              </div>
    </div>
  )
}

export default Footer