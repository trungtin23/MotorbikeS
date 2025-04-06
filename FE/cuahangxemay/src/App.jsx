import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Layout from "./Components/Layout.jsx";
import About from "./Components/About.jsx";
import Services from "./Components/Services.jsx";
import Contacts from "./Components/Contacts.jsx";

const App = () => {
    return (
        <>
            <Layout/>
            <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="service" element={<Services />} />
                    <Route path="contact" element={<Contacts />} />
            </Routes>
        </>

    );
};

export default App;
