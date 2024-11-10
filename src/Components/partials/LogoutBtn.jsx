import React from "react";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button onClick={logoutHandler} className="px-4 py-2 bg-black rounded-full text-white tracking-tighter">
      Logout
    </button>
  );
}

export default LogoutBtn;
