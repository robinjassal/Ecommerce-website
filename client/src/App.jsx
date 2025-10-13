import React from "react";
import { Button } from "./components/ui/button";
import Login from "./pages/auth/login";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Register from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Features from "./pages/admin/Features";
import ShoppingLayout from "./components/shopping-cart/layout";
import NotFound from "./pages/not-found";
import Home from "./pages/shopping-cart/Home";
import ProductListing from "./pages/shopping-cart/ProductListing";
import Checkout from "./pages/shopping-cart/Checkout";
import Account from "./pages/shopping-cart/Account";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="features" element={<Features />} />
        </Route>
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="products-listing" element={<ProductListing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
