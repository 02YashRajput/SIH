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
    <div class="relative pt-28 min-h-screen  flex flex-col ">
      {waiting === true ? (
        <div class="w-full flex justify-center items-center h-screen">
          <Loading />{" "}
        </div>
      ) : (

        <div class="flex-grow flex flex-col justify-center items-center ">
          <Header userName={pageData.data.user.name}></Header>
          {console.log(pageData)}
          {/* hello */}
          <video class="h-screen w-full object-cover" autoPlay loop muted>
            <source src={DashboardVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <section className="w-full py-12 md:py-24 lg:py-32 flex  justify-center items-center  bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Core Features</h2>
            <div className="grid gap-6 items-center md:grid-cols-2 lg:grid-cols-3">
              <div className="border rounded-lg p-6 shadow-md">
                <div className="mb-2">
                  <svg className="h-10 w-10 text-green-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9l3 3-3 3M3 9h12l-3 3 3 3H3M6 9v6" />
                  </svg>
                  <h3 className="text-2xl font-semibold">Contract Management</h3>
                </div>
                <p className="text-2xl text-gray-500">Negotiate, draft, and finalize farming contracts digitally. Manage quantity, quality, delivery schedules, and payment terms all in one place.</p>
              </div>
              <div className="border rounded-lg p-6 shadow-md">
                <div className="mb-2">
                  <svg className="h-10 w-10 text-green-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 2m1-11h2a2 2 0 012 2v12a2 2 0 01-2 2h-2M5 19h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-2xl font-semibold">Price Negotiation</h3>
                </div>
                <p className="text-2xl text-gray-500">Use our dynamic price negotiation tool to agree on fair prices. Leverage real-time market data and demand forecasts for optimal pricing.</p>
              </div>
              <div className="border rounded-lg p-6 shadow-md">
                <div className="mb-2">
                  <svg className="h-10 w-10 text-green-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16c0 1.333.667 3 2 3h12c1.333 0 2-1.667 2-3V8c0-1.333-.667-3-2-3H6c-1.333 0-2 1.667-2 3v8zM7 14l2 2 4-4m4 0h-2.586L13 10.586M5 18v2h14v-2H5z" />
                  </svg>
                  <h3 className="text-2xl font-semibold">Secure Payments</h3>
                </div>
                <p className="text-2xl text-gray-500">Ensure timely and secure payments with our integrated payment gateways and escrow services, protecting both farmers and buyers.</p>
              </div>
              <div className="border rounded-lg p-6 shadow-md">
                <div className="mb-2">
                  <svg className="h-10 w-10 text-green-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15v4a2 2 0 01-2 2h-4m6-18v6m0-6H5M3 21v-4a2 2 0 012-2h4m-6 6V5m18 6h-6a2 2 0 01-2-2V5M9 3v4m12-2V5m-2 0h-2m2 2h2m-4-4V3m-2 2H9" />
                  </svg>
                  <h3 className="text-2xl font-semibold">Communication Channels</h3>
                </div>
                <p className="text-2xl text-gray-500">Stay connected with integrated chat and video call tools. Ensure transparent and efficient communication between farmers and buyers.</p>
              </div>
              <div className="border rounded-lg p-6 shadow-md">
                <div className="mb-2">
                  <svg className="h-10 w-10 text-green-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10V4l-4 4-4-4v6h2v6h4v-6h2zM4 14h4v6H4v-6zm12 6v-6h4v6h-4zm0-8h4V4h-4v8z" />
                  </svg>
                  <h3 className="text-2xl font-semibold">Real-Time Updates</h3>
                </div>
                <p className="text-2xl text-gray-500">Get real-time updates on market trends, weather forecasts, and other vital farming information to stay ahead of the curve.</p>
              </div>
              <div className="border rounded-lg p-6 shadow-md">
                <div className="mb-2">
                  <svg className="h-10 w-10 text-green-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 2m1-11h2a2 2 0 012 2v12a2 2 0 01-2 2h-2M5 19h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-2xl font-semibold">AI-Powered Insights</h3>
                </div>
                <p className="text-2xl text-gray-500">Leverage AI to analyze data and receive personalized insights for your farming practices and contract negotiations.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 items-center md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  AgriConnect simplifies the contract farming process, providing a seamless experience from contract negotiation to harvest delivery.
                </p>
                <ul className="grid gap-4 mt-6 text-lg">
                  <li className="flex items-center gap-2">
                    <div className="h-4 w-4 text-green-600" />
                    <span>Create your farmer or buyer profile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-4 w-4 text-green-600" />
                    <span>Browse or list farming opportunities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-4 w-4 text-green-600" />
                    <span>Negotiate terms and finalize contracts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-4 w-4 text-green-600" />
                    <span>Manage production and track progress</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-4 w-4 text-green-600" />
                    <span>Securely process payments upon delivery</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Contract Farming Process"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white flex justify-center items-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Success Stories</h2>
            <div className="grid gap-6 items-center md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "John Doe", role: "Wheat Farmer", quote: "AgriConnect has transformed my farming business. I now have guaranteed buyers before I even plant my crops." },
                { name: "Jane Smith", role: "Produce Distributor", quote: "The price predictor tool has been invaluable in helping us make informed purchasing decisions." },
                { name: "Mike Johnson", role: "Organic Vegetable Farmer", quote: "The contract management system has simplified my operations and reduced paperwork significantly." },
              ].map((testimonial, index) => (
                <div key={index}>
                  <div className="p-6">
                    <p className="text-lg text-gray-500 mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-green-500 w-12 h-12" />
                      <div>
                        <p className="text-lg font-medium">{testimonial.name}</p>
                        <p className="text-lg text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Dashboard;
