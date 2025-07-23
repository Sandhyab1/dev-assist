import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { Button } from "@mui/material";
import { Login } from "./components/Login/Login.jsx";
import Header from "./components/Header/Header.jsx";
import Manager from "./components/Admin/Management/Manager.jsx";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  
  // Listen for changes to localStorage
  useEffect(() => {
    const checkUserAuth = () => {
      const currentUser = localStorage.getItem("user");
      setUser(currentUser);
    };
    
    // Check initially
    checkUserAuth();
    
    // Set up event listener for storage changes
    window.addEventListener('storage', checkUserAuth);
    
    // Custom event for login from other components
    const handleLoginEvent = () => {
      checkUserAuth();
    };
    window.addEventListener('user-login', handleLoginEvent);
    
    return () => {
      window.removeEventListener('storage', checkUserAuth);
      window.removeEventListener('user-login', handleLoginEvent);
    };
  }, []);
  
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
          />
          <Route
            path="/"
            element={
              !user ? <Navigate to="/login" /> : <Manager />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
