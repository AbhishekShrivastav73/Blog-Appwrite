import React from "react";
import LogoutBtn from "./partials/LogoutBtn";
import authService from "../appwrite/auth";
import authSlice, { login, logout } from "../store/authSlice";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Post",
      slug: "/all-post",
      active: authStatus,
    },
    {
      name: "Create Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="w-full p-4 tracking-tighter">
      <nav className="flex items-center justify-between">
        <h1 className="font-bold text-lg tracking-tighter">WEB.DEV</h1>
        <div className="flex items-center gap-5 ">
          {navItem.map((item) => {
            return item.active ? <Link className="font-normal" key={item.name} to={item.slug}> {item.name} </Link> : null;
          })}
          {authStatus && <LogoutBtn/>}
        </div>
      </nav>
    </header>
  );
}

export default Header;
