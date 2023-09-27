import React from "react";
import "./style.css";

const Loader = () => {
  return (
    <section className="bg-gray-400 bg-opacity-50 h-screen w-screen absolute z-10">
      <div className="lds-dual-ring"></div>
    </section>
  );
};

export default Loader;
