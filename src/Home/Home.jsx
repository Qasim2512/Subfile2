/** @format */

import "./Home.css";
import Carousel from "./Carousel/Carousel";
import Comment from "./HomeComments/Comment";


function Home() {
  return (
    <div>
      <Carousel />
      <Comment />
      <br />
      <p>Use this page to detail your site's privacy policy.</p>
    </div>
  );
}

export default Home;
