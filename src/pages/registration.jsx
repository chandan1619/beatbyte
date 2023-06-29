import React from "react";
import TopBar from "../components/TopBar";
import Registration from "../components/Registration";
import Footer from "../components/Footer";

const registration = () => {
  return (
    <div class="flex flex-col min-h-screen">
      <div class="flex-grow">
        <TopBar />
        <Registration />
      </div>
      <Footer />
    </div>
  );
};

export default registration;
