"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/page";

const ForgotPassword = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/users/forgotPassword", {
        email,
      });
      setIsLoading(false);
      toast.success("Reset Email Sent");
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Email not registered");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  return (
    <section className="text-white-600 body-font relative bg-gradient-to-r from-gray-700 via-gray-900 to-black h-screen text-white">
      {isLoading ? <Loader /> : ""}
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white-900">
            Reset Your Password
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            We will send a reset link to your email, Please Enter the registered
            email.
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="p-4 w-1/2">
            <div className="relative">
              <label
                htmlFor="userEmail"
                className="leading-7 text-sm text-white-600"
              >
                Email
              </label>
              <input
                type="email"
                id="userEmail"
                name="email"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-full">
              <button
                disabled={buttonDisabled}
                onClick={handleReset}
                className={`flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none rounded text-lg ${buttonDisabled
                    ? "cursor-not-allowed bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-red-500 hover:to-red-500"
                    : "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-400 hover:to-green-400"
                  }`}
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
