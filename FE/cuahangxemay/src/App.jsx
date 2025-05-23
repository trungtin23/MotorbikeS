import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "./layout/Header.jsx";
import About from "./Components/About.jsx";
import Services from "./Components/Services.jsx";
import Contacts from "./Components/Contacts.jsx";
import Products from "./Components/Products.jsx";
import HomePage from "./Components/HomePage.jsx";
import LoginPage from "./Components/Account/Login.jsx";
import RegisterPage from "./Components/Account/Resigter.jsx";
import CustomerProfile from "./Components/Account/Profile.jsx";
import ScrollRestoration from "./Components/ScrollRestoration.jsx";
import Cart from "./Components/Cart.jsx";
import ProductDetail from "./Components/ProductDetails.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="resigter" element={<RegisterPage />} />
      <Route element={<Header />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="profile" element={<CustomerProfile />} />
        <Route path="service" element={<Services />} />
        <Route path="contact" element={<Contacts />} />
        <Route
          path="product"
          element={
            <>
              <ScrollRestoration />
              <Products />
            </>
          }
        />
          <Route path="productdetail/:id" element={<ProductDetail/>} />
          <Route path="cart" element={<Cart/>} />
      </Route>
    </Routes>
  );
};

export default App;
