import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Product from "../Pages/Product";
import AddProduct from "../Components/AddProduct";
import Cart from "../Pages/Cart";
import Description from "../Pages/Description";
import LoginPage from "../Pages/LoginPage";
import PrivateRoute from "../Components/PrivateRoute";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/product" element={
        <PrivateRoute>
          <Product />
        </PrivateRoute>
      } />
      <Route path="/description/:id" element={<Description />} />
      <Route path="/add-product" element={
        <PrivateRoute>
          <AddProduct />
        </PrivateRoute>
        } />
      <Route path="/cart" element={
        <PrivateRoute>
          <Cart />
        </PrivateRoute>
        } />
    </Routes>
  );
};

export default Allroutes;
