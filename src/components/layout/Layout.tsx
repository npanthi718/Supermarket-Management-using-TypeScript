import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};