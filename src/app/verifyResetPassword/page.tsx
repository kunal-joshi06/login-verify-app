"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/page";
import { toast } from "react-toastify";

const verifyResetPassword = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [passwordCreds, setPasswordCreds] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleBaseUrl = async () => {
    try {
      const user = await axios.get("/api/users/tokenData");
      setBaseUrl(user.data.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/users/resetPassword", {
        passwordCreds,
        token,
      });
      toast.success("Password Changed Successfully");
      router.push(`/profile/${baseUrl}`);
      setIsLoading(false);
    } catch (error) {
      toast.error("An error Occurred");
      setIsLoading(false);
      return error;
    }
  };

  useEffect(() => {
    if (
      passwordCreds.newPassword.length > 0 &&
      passwordCreds.confirmPassword.length > 0 &&
      passwordCreds.confirmPassword === passwordCreds.newPassword
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [passwordCreds]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
    handleBaseUrl();
  }, []);

  return (
    <section className="text-white-600 body-font relative h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
      {isLoading ? <Loader /> : " "}
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white-900">
            Enter your New Password
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Enter a strong password that contains numbers, symbols as well as
            upper and lower-case alphabets. Make sure that both passwords match.
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="newPassword"
                  className="leading-7 text-sm text-white-600"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={passwordCreds.newPassword}
                  onChange={(e) =>
                    setPasswordCreds({
                      ...passwordCreds,
                      newPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-white-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={passwordCreds.confirmPassword}
                  onChange={(e) =>
                    setPasswordCreds({
                      ...passwordCreds,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="p-2 w-full">
              <button
                disabled={buttonDisabled}
                onClick={handleReset}
                className={`flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none rounded text-lg ${buttonDisabled
                    ? "cursor-not-allowed bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-red-500 hover:to-red-500"
                    : "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-400 hover:to-green-400"
                  }`}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default verifyResetPassword;
