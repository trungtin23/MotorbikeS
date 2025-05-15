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

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="resigter" element={<RegisterPage />} />
      <Route element={<Header />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="product" element={<Products />} />
        <Route path="service" element={<Services />} />
        <Route path="contact" element={<Contacts />} />
      </Route>
    </Routes>
  );
};

export default App;
