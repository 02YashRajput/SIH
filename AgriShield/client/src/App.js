
import { Routes,Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound'; 
import { useEffect } from 'react';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';

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
      <Route path='*' element={<NotFound/>}/> 
    </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;
