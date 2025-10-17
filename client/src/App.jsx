import React, { useEffect } from "react";
import { Button } from "./components/ui/button";
import Login from "./pages/auth/login";
import { Navigate, Route, Routes } from "react-router-dom";
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
import CheckAuth from "./components/common/CheckAuth";
import UnAuth from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";

function App() {
  // const isAuthenticated = false;
  // const user = {
  //   userName: "robin",
  //   role: "custmer"
  // };

  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth)

  const dispath = useDispatch()
  useEffect(() => {
    dispath(checkAuth())
  }, [])

  if (isLoading) return <p>loading...</p>


  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="features" element={<Features />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<ProductListing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="/unauth-page" element={<UnAuth />} />
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
