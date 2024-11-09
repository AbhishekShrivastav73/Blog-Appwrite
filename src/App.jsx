import React, { useEffect, useState } from "react";
import conf from "./conf/conf";
import Header from "./Components/Header";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return !loading ? (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />  
    </div>
  ) : null;
}

export default App;
