"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader/page";
import { toast } from "react-toastify";

const Signup = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/users/signup", user);
      console.log(res.data);
      toast.success("Registration Successfull");
      router.push("/login");
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Registration Unsuccessful");
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (
      user.firstName.length > 0 &&
      user.lastName.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <section className="h-screen text-white-600 body-font relative bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
      {isLoading ? <Loader /> : ""}
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white-900">
            Sign Up
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Enter your details in all the fields to register an account and
            start your journey..
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="firstName"
                  className="leading-7 text-sm text-white-600"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="firstName"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={user.firstName}
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="lastName"
                  className="leading-7 text-sm text-white-600"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lastName"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={user.lastName}
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-white-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
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
            <div className="p-2 w-full mt-4">
              <button
                disabled={buttonDisabled}
                onClick={handleSignup}
                className={`flex mx-auto text-white border-0 py-2 px-8 focus:outline-none ${buttonDisabled
                    ? "cursor-not-allowed bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-red-500 hover:to-red-500"
                    : "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-400 hover:to-green-400"
                  } rounded text-lg`}
              >
                Sign Up
              </button>
            </div>
            <Link href="/login" className="text-white underline mt-4">
              Already a member? Login instead.
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
