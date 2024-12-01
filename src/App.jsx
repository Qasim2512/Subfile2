/** @format */

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import ScrollView from "./ScrollView/ScrollView";
import UploadImage from "./UploadImage/UploadImage";
import Navbar from "./Navbar/Navbar";
import Edit from "./Edit/Edit";
import LoggInn from "./Account/Logginn/LoggInn";
import Register from "./Account/Register/Register";
import Footer from "./Privacy/Footer";
import Privacy from "./Privacy/Privacy";
import ForgotPassword from "./Account/ForgotPassword/ForgotPassword";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scrollView" element={<ScrollView />} />
        <Route path="/uploadImage" element={<UploadImage />} />
        <Route path="/logginn" element={<LoggInn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
