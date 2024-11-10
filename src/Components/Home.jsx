import React, { useEffect, useState } from "react";
import authService from "../appwrite/auth";
import { login, logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import Header from "./Header";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
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

  useEffect(() => {
    fetchCurrentUser();
  }, []);
  return !loading ? (
    <div>
      <Header />
    </div>
  ) : null;
};

export default Home;
