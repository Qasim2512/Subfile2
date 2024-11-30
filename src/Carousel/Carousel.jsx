/** @format */

import bildet from "../assets/Bildet2.jpg";
import bildet2 from "../assets/bildet3.jpg";
import bildet3 from "../assets/image.png";

export default function Carousel() {
  return (
    <>
      <h1>WELCOME TO PIXNOTE</h1>

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
              src={bildet}
              className="d-block w-100 rounded"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              src={bildet2}
              className="d-block w-100 rounded"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              src={bildet3}
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
