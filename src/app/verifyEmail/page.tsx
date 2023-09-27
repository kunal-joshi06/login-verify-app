"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "@/components/Loader/page";

const VerifyEmail = () => {
  const [token, setToken]: any = useState("");
  const [verified, setVerified] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
      console.log(res);
    } catch (error) {
      console.log(error);
      setVerified(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <div className="text-center">
        {verified ? (
          <div className="text-white m-5">
            Your Email has been successfully Verified.{" "}
            <p>You can close this window now.</p>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default VerifyEmail;
