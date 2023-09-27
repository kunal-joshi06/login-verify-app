"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader/page";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/users/login", user);
      toast.success("Login Successful");
      router.push(`/profile/${res.data.userId}`);
      return res;
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Login failed, Incorrect email or password");
      console.log("Login failed", error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <section className="h-screen text-white-600 body-font relative bg-gradient-to-r from-gray-700 via-gray-900 to-black">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white-900 text-white">
              Login
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-white">
              Enter your registered email and password to continue..
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-white-600 text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="leading-7 text-sm text-white-600 text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="p-1 text-white underline cursor-pointer text-sm">
                <Link href="/forgotPassword">Forgot Password?</Link>
              </div>
              <div className="p-2 w-full">
                <button
                  disabled={buttonDisabled}
                  onClick={handleLogin}
                  className={`flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none rounded text-lg ${buttonDisabled
                    ? "cursor-not-allowed bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-red-500 hover:to-red-500"
                    : "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-400 hover:to-green-400"
                    }`}
                >
                  Login
                </button>
              </div>
              <Link
                href="/signup"
                className="text-white underline mt-4 text-sm"
              >
                Not a member? Sign-up instead.
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
