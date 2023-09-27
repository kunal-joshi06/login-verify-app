"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/page";

const Profile = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser]: any = useState({
    firstName: "",
    lastName: "",
    email: "",
    isVerified: false,
    userId: "",
  });

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const userData = await axios.get("/api/users/tokenData");
      setUser({
        firstName: userData.data.data.firstName,
        lastName: userData.data.data.lastName,
        email: userData.data.data.email,
        isVerified: userData.data.data.isVerified,
        userId: userData.data.data._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyEmail = async () => {
    setIsLoading(true);
    try {
      const uId = user.userId;
      const uEmail = user.email;
      const res = await axios.post("/api/users/sendEmailVerification", {
        uId,
        uEmail,
      });
      toast.success("Verification Email Sent");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <section className="h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
      {isLoading ? <Loader /> : ""}
      <div className="flex p-5">
        <div className="text-white text-4xl flex-auto">
          Welcome {user.firstName} {user.lastName}
        </div>
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg flex-none"
        >
          Logout
        </button>
      </div>
      <section className="text-white-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -mx-4 -my-8">
            <div className="py-8 px-4 lg:w-1/3">
              <div className="h-full flex items-start">
                <div className="flex-grow pl-6">
                  <h2 className="tracking-widest title-font font-medium mb-1 underline">
                    Verify Your Account
                  </h2>
                  {user.isVerified ? (
                    <h1 className="title-font text-xl font-medium text-green-600 mb-3">
                      Your Account is verified
                    </h1>
                  ) : (
                    <h1 className="title-font text-xl font-medium text-red-600 mb-3">
                      Your Account has not been verified
                    </h1>
                  )}

                  <p className="leading-relaxed mb-5">
                    Verify your account and enjoy our services to the fullest.
                    To Verify your account click the button below.
                  </p>
                  <a className="inline-flex items-center">
                    <span className="flex-grow flex flex-col pl-3">
                      {user.isVerified ? (
                        <span className="title-font font-medium text-green-400">
                          Verified
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="p-2 rounded bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-green-500 ..."
                          onClick={handleVerifyEmail}
                        >
                          Verify Now
                        </button>
                      )}
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="py-8 px-4 lg:w-1/3">
              <div className="h-full flex items-start">
                <div className="flex-grow pl-6">
                  <h2 className="tracking-widest title-font font-medium mb-1 underline">
                    Password Settings
                  </h2>
                  <h1 className="title-font text-xl font-medium text-green-600 mb-3">
                    Reset your Password
                  </h1>
                  <p className="leading-relaxed mb-5">
                    Forgot your password? Or having security issues. Reset your
                    password below.
                  </p>
                  <div className="inline-flex items-center">
                    <span className="flex-grow flex flex-col pl-3">
                      <Link href="/forgotPassword">
                        <button
                          type="button"
                          className="p-2 rounded bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-500 hover:to-red-500 ..."
                        >
                          Reset Password
                        </button>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Profile;
