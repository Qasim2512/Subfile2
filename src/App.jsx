/** @format */

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import ScrollView from "./ScrollView/ScrollView";
import UploadImage from "./UploadImage/UploadImage";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scrollView" element={<ScrollView />} />
        <Route path="/uploadImage" element={<UploadImage />} />
      </Routes>
    </div>
  );
}

export default App;
