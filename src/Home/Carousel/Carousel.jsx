/** @format */

import image from "../../assets/image.png";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import "./Carousel.css";

export default function Carousel() {
  return (
    <>
      <h1 className="title">WELCOME TO PIXNOTE</h1>

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={image}
              className="d-block w-100 rounded"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              src={image2}
              className="d-block w-100 rounded"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              src={image3}
              className="d-block w-100 rounded"
              alt="Third slide"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

/*
@if (hasImages/ingenbilder)
  {  { else
      <div className="col-md-12 text-center">
        <h2>No images uploaded yet. Still in progress!</h2>
      </div>
  }
      */
