import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import nikkeBg from "../assets/bg.jpg";

function ProtectedLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${nikkeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;
