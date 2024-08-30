import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
const ContactUs = () => {
  const { setLoading, fetchData, pageData } = useContext(AppContext);
  const [waiting, setWaiting] = useState(true);
  const location = useLocation();
  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const nameValue = formData.get("name");
    const emailValue = formData.get("email");
    const phoneValue = formData.get("phone");
    const messageValue = formData.get("message");

    try {
      if (!nameValue) throw new Error("Please enter a name");
      if (!emailValue) throw new Error("Please enter an email");
      if (!phoneValue) throw new Error("Please enter a phone no.");
      if (!messageValue) throw new Error("Please enter a message.");

      const response = await axios.post("/api/contact-us", {
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
        msg: messageValue,
        userType: pageData.data.user.userType,
      },
      {
        headers: {
          'ngrok-skip-browser-warning': 'any-value'
        }}   );

      if (response.status === 201) {
        toast.success(response.data.message);
        // Reset the form fields after successful submission
        form.reset();
      }
    } catch (err) {
      if (err.response && err.response.data) {
        // Access the custom message and error array from the server response
        toast.error(`${err.response.data.message}`);
      } else {
        // Fallback for other types of errors
        toast.error(err.message);
      }
    }
  };

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
    <div class="relative pt-28 min-h-screen flex flex-col  ">
      {waiting === true ? (
        <div class="w-full flex justify-center items-center h-screen">
          <Loading />{" "}
        </div>
      ) : (
        <div class=" w-full p-20 px-60 flex-grow flex flex-col">
          <Header userName={pageData.data.user.name}></Header>

          {/* hero section  */}
          <div class="bg-green-100 py-20  w-full flex-grow flex justify-center items-center shadow-2xl">
            <div class="bg-white w-1/2 p-10 flex flex-col justify-center items-center">
              <h1 class="text-5xl text-gray-500">Get In Touch</h1>
              <div class="mt-5 w-1/4 h-[2px] bg-blue-700"></div>
              <form
                class="bg-white w-full  flex flex-col justify-center items-center"
                onSubmit={(e) => {
                  submitHandler(e);
                }}
              >
                <label class="  text-2xl text-gray-700 mb-6 w-[70%] mt-10  ">
                  Name:
                  <input
                    type="text"
                    name="name"
                    class="mt-1 text-lg block  p-2 border w-full border-gray-300 rounded-lg outline-none"
                    placeholder="Your name"
                  />
                </label>
                <label class="text-2xl text-gray-700 mb-6 w-[70%]">
                  Email
                  <input
                    type="email"
                    name="email"
                    class="mt-1 text-lg block  p-2 border w-full border-gray-300 rounded-lg outline-none"
                    placeholder="Your email"
                  />
                </label>
                <label class="text-2xl text-gray-700 mb-6 w-[70%]">
                  Phone No.
                  <input
                    type="tel"
                    name="phone"
                    class="mt-1 text-lg block  p-2 border w-full border-gray-300 rounded-lg outline-none"
                    placeholder="Your email"
                  />
                </label>
                <label class="text-2xl text-gray-700 mb-6 w-[70%]">
                  Message
                  <textarea
                    name="message"
                    class="mt-1 text-lg block  p-2 border w-full border-gray-300 rounded-lg outline-none"
                    placeholder="Your message"
                  ></textarea>
                </label>
                <button class="py-2 px-4 bg-green-200 text-2xl rounded-lg mt-8">
                  Submit
                </button>
              </form>
              <div class="mt-10 text-4xl flex gap-8">
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
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ContactUs;
