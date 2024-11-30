/** @format */

import "./App.css";
import Carousel from "./Carousel/Carousel";
import Comment from "./HomeComments/Comment";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />

      <Carousel />

      <Comment />

      <p>Use this page to detail your site's privacy policy.</p>
    </div>
  );
}

export default App;
