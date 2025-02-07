import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../Sidebar";
import Dashboard from "../Home";
import Products from "../vendor/shop/";
import Vendors from "./Vendors";
import Customers from "./Customers";
import Inventory from "./Inventory";
import Reports from "./Reports";
import Settings from "./Settings";

function AppRoutes() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard-products" element={<Products />} />
        <Route path="/dashboard-vendors" element={<Vendors />} />
        <Route path="/dashboard-customers" element={<Customers />} />
        <Route path="/dashboard-inventory" element={<Inventory />} />
        <Route path="/dashboard-reports" element={<Reports />} />
        <Route path="/dashboard-setting" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;