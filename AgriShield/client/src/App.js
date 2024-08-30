
import { Routes,Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound'; 
import { useEffect } from 'react';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import MyContracts from './pages/MyContracts';
import MarketPlace from './pages/MarketPlace';
import Contract from './pages/Contract';
import Negotiations from './pages/Negotiations';

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{

    if(location.pathname === "/"){
      navigate("/dashboard"); 
    }
  },[location.pathname,navigate])



  return (
    < >
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/> 
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path = "/login" element = {<Login/>}/>
      <Route path="/contact-us" element={<ContactUs/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path='/my-contracts' element={<MyContracts/>}/>
      <Route path="/market-place" element={<MarketPlace/>}/>
      <Route path='/contract' element={<Contract/>}/>
      <Route path="/negotiations" element={<Negotiations/>}/>
      <Route path='*' element={<NotFound/>}/> 
    </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;
