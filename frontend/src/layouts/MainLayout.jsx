import React from "react";
import nikkeBg from "../assets/bg.jpg"; // pastikan path gambar benar

const MainLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${nikkeBg})` }}
    >
      {children}
    </div>
  );
};

export default MainLayout;
