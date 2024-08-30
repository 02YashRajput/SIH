import { createContext, useState,useCallback } from "react"; 
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();
export default function AppContextProvider({children}){
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({});
  const navigate = useNavigate();
  // Use useCallback to memoize fetchData function
  const fetchData = useCallback(async (url) => {
    setLoading(true);  // Start loading

    try {
      const res = await fetch("/api"+url);
      if(res.status === 404){
        navigate("/login");
      }
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();

      setPageData(data);
    } catch (error) {
      console.error('Fetching error:', error);
      // Handle errors here
    } finally {
      setLoading(false);  // End loading regardless of success or failure
    }
  }, [navigate]);
  const value = {
    loading,
    setLoading,
    pageData,
    setPageData,
    fetchData
    // Add your context values here
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}