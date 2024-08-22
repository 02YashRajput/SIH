import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { toast } from "react-toastify";
import logo from "../utils/AgriShield Logo Transparent.png";
import Background from "../components/Background";
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [showUserTypeInput, setShowUserTypeInput] = useState(true);
  const signUpSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const emailValue = formData.get("email");
    const passwordValue = formData.get("password");
    const name = formData.get("name");
    const phone = formData.get("phone");
    const confirmPasswordValue = formData.get("confirm-password");

    try {
      if (!name) throw new Error("Please enter your name");
      if (!emailValue) throw new Error("Please enter an email");
      if (!passwordValue) throw new Error("Please enter a password");
      if (!confirmPasswordValue) throw new Error("Please enter a Confirm Password");
      if (!phone) throw new Error("Please enter a Phone No.");
      if(passwordValue !== confirmPasswordValue) throw new Error("Password and Confirm Password must be same")

      const response = await axios.post("/api/sign-up", {
        name: name,
        email: emailValue,
        password: passwordValue,
        phone:phone,
        userType: userType,
      });
      if (response.status === 201) {
        toast.success("Signed Up successfully");
        navigate("/dashboard")
      }
    } catch (err) {
      if (
        err.message === "Please enter your name" ||
        err.message === "Please enter an email" ||
        err.message === "Please enter an Phone No." ||
        err.message === "Please enter a password"||
        err.message === "Please enter a Confirm Password"||
        err.message === "Password and Confirm Password must be same"
      ) {
        toast.error(err.message);
      } else {
        toast.error("email or phone no. already in use");
      }
      console.log(err.message);
      console.log(err);
    }
  };

  return (
    <div className="relative flex justify-center items-center overflow-hidden   min-h-screen min-w-screen bg-slate-300 ">
      <Background />

      <div className="flex flex-col md:flex-row gap-5  justify-center items-center bg-[rgba(255, 255, 255, 0.1)] p-5   backdrop-blur-sm">
        {/* logo section */}
        <div className=" ">
          <img className="h-52 rounded-md " src={logo} alt="logo" />
          <p className="text-lg font-semibold mt-3 text-slate-500 text-center">
            Farm with Confidence<br/> Market with Ease.  
          </p>
        </div>
        {/* partition */}
        <div className="md:h-96 md:w-0.5 h-0.5 w-96 bg-slate-700"></div>
        {/* user input */}
        <div className=" p-10 flex flex-col ">
          <p
            onClick={() => {
              navigate("/login");
            }}
            className="self-end mr-5  text-rose-600 cursor-pointer"
          >
            Login -&gt;
          </p>

          {showUserTypeInput ? (
            <div className="flex flex-col items-center mt-5">
              <h2 className="text-2xl font-semibold text-slate-500">
                Select Your User Type
              </h2>
              <form
                className="mt-10  flex flex-col"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (e.target.userType.value) {
                    setShowUserTypeInput(false);
                  } else {
                    toast.error("Please select your user type");
                  }
                }}
              >
                <div>
                  <label
                    className={`cursor-pointer px-5 py-3 mr-2 text-slate-800 rounded-md text-xl bg-yellow-300 ${
                      userType === "Farmer"
                        ? "bg-yellow-500"
                        : "bg-yellow-300"
                    } `}
                  >
                    <input
                      className="hidden "
                      type="radio"
                      name="userType"
                      value="Farmer"
                      onClick={() => setUserType("Farmer")}
                    />
                    Farmer
                  </label>
                  <label
                    className={`cursor-pointer  px-5 py-3 ml-2 text-slate-800 rounded-md text-xl bg-yellow-300 ${
                      userType === "Buyer"
                        ? "bg-yellow-500"
                        : "bg-yellow-300"
                    } `}
                  >
                    <input
                      className="hidden "
                      type="radio"
                      name="userType"
                      value="Buyer"
                      onClick={() => setUserType("Buyer")}
                    />
                    Buyer
                  </label>
                  <label
                    className={`cursor-pointer  px-5 py-3 ml-2 text-slate-800 rounded-md text-xl bg-yellow-300 ${
                      userType === "Admin"
                        ? "bg-yellow-500"
                        : "bg-yellow-300"
                    } `}
                  >
                    <input
                      className="hidden "
                      type="radio"
                      name="userType"
                      value="Admin"
                      onClick={() => setUserType("Admin")}
                    />
                    Admin
                  </label>
                </div>
                <button className="px-5 py-3 mt-10    text-red-800 rounded-md text-xl bg-yellow-300">
                  Next-&gt;
                </button>
              </form>
            </div>
          ) : (
            <form
              onSubmit={signUpSubmitHandler}
              className="flex flex-col gap-7 text-xl mt-2  "
            >
              <label className="flex flex-col gap-2">
                <h3>Name</h3>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="border border-slate-950  outline-none bg-transparent  p-1 rounded-md"
                />
              </label>
              <label className="flex flex-col gap-2 ">
                <h3>Email</h3>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border border-slate-950 outline-none
                    bg-transparent   p-1 rounded-md "
                />
              </label>
              <label className="flex flex-col gap-2 ">
                <h3>Phone No.</h3>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone No."
                  className="border border-slate-950 outline-none
                    bg-transparent   p-1 rounded-md "
                />
              </label>
              <label className="flex flex-col gap-2">
                <h3>Password</h3>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="border border-slate-950 outline-none   bg-transparent  p-1 rounded-md "
                />
              </label>
              <label className="flex flex-col gap-2">
                <h3>Confirm Password</h3>
                <input
                  type="password"
                  name="confirm-password"
                  placeholder="Confirm Password"
                  className="border border-slate-950 outline-none   bg-transparent  p-1 rounded-md "
                />
              </label>

              <button className="px-4 py-1 bg-yellow-400 max-w-32 rounded-md self-center  ">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
