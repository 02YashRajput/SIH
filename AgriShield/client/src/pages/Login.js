import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"
import './Login.css'
import logo from "../utils/AgriShield Logo Transparent.png"
import Background from "../components/Background";
const Login = () => {
  const navigate = useNavigate();

  const loginSubmitHandler = async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const identifier = formData.get("identifier");
    const passwordValue = formData.get("password");
    try{
      if(!identifier) throw new Error("Please enter an email or phone no.");
      if(!passwordValue) throw new Error("Please enter a password");
      const response = await axios.post("/api/login", {
        identifier: identifier,
        password: passwordValue,
      });
      if (response.status === 200) toast.success("Logged In successfully");
      navigate('/dashboard')
    }
    catch(err){
      if (
              err.message === "Please enter an Please enter an email or phone no." ||
              err.message === "Please enter a password"
            ) {
              toast.error(err.message);
            } else {
              toast.error("invalid Email or Phone No. or Password");
            }
            console.log(err);
    }
  }



  return (
    <div className="relative flex justify-center items-center overflow-hidden   min-h-screen min-w-screen bg-slate-300">
      <Background/>
      <div className="flex flex-col md:flex-row gap-5  justify-center items-center bg-[rgba(255, 255, 255, 0.1)] p-5   backdrop-blur-sm">
        {/* logo section */}
        <div className=" ">
          <img className="h-32 rounded-md " src={logo} alt="logo"/>
          <p className="text-lg font-semibold mt-3 text-slate-500 text-center">Farm with Confidence<br/> Market with Ease.  </p>
        </div>

        {/* partition */}
        <div className="md:h-96 md:w-0.5 h-0.5 w-96 bg-slate-700"></div>
        {/* user input */}
        <div className=" w-[28rem] p-10 flex flex-col ">
          <p
            onClick={() => {
              navigate("/sign-up");
            }}
            className="self-end mr-5  text-rose-600 cursor-pointer"
          >
            New User -&gt;
          </p>
          <form onSubmit={loginSubmitHandler} className="flex flex-col gap-7 text-xl mt-2 ">

            <label className="flex flex-col gap-2">
              <h3>Email or Phone No. </h3>
              <input
                type="identifier"
                name= "identifier"
                placeholder="Email or Phone No."
                className="border border-slate-950 outline-none   bg-transparent   p-1 rounded-md "
              />
            </label>
            <label className="flex flex-col gap-2">
              <h3>Password</h3>
              <input
                type="password"
                name = "password"
                placeholder="Password"
                className="border border-slate-950 outline-none   bg-transparent  p-1 rounded-md "
              />
            </label>
            <button className="px-4 py-1 bg-yellow-400 max-w-32 rounded-md self-center  ">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
