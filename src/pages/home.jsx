import React from "react";
import TopBar from "../components/TopBar";
import Cards from "../components/Cards";
import Footer from "../components/Footer";

const home = () => {
  return (
    <div className="h-screen">
      <TopBar />
      <Cards />
      <Footer />
    </div>
  );
};

export default home;
