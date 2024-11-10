import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import Input from "./partials/Input";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();

  const handleSignup = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
      console.log("Error during signup or login:", error.message);
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-4/12 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Create your account!
        </h2>
        <p className="mb-4">
          Already Have an Account ?{" "}
          <Link to={"/login"} className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
          <Input
            label="Full Name :"
            placeholder="Enter your full name"
            {...register("name", {
              required: true,
            })}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          />
          <Input
            label="Email :"
            placeholder="Enter your Email"
            type="email"
            {...register("email", {
              required: true,
              validate: (value) => value.includes("@"),
            })}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          />
          <Input
            label="Password :"
            placeholder="Enter your Password"
            type="password"
            {...register("password", {
              required: true,
            })}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
