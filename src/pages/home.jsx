import React from "react";
import TopBar from "../components/TopBar";
import Cards from "../components/Cards";
import Footer from "../components/Footer";

const home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div class="flex-grow">
      <TopBar />
      <Cards />
      </div>
      <Footer />
    </div>
  );
};

export default home;
