import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Projects";
    if (path === "/dashboard") return "Dashboard";
    if (path === "/settings") return "Settings";
    if (path.startsWith("/project/")) return "Project";
    return "FlowBoard";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className="lg:ml-64">
        <Header 
          title={getPageTitle()}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="min-h-[calc(100vh-73px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;