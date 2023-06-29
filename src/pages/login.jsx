import React from "react";
import TopBar from "../components/TopBar";
import Login from "../components/Login";
import Footer from "../components/Footer";

const login = () => {
  return (
    <div class="flex flex-col min-h-screen">
      <div class="flex-grow">
        <TopBar />
        <Login />
      </div>
      <Footer />
    </div>
  );
};

export default login;
