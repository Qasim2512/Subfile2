/** @format */

import image from "../../assets/image.png";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.png";
import "./Carousel.css";
import React, { useEffect, useState } from "react";

export default function Carousel() {
  const [userData, setUserData] = useState(null);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/photos?_start=0&_limit=5")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);
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

        {userData && (
          <div>
            {userData.map((userData, key) => (
              <div className="carousel-inner" key={index}>
                <div
                  className={`carousel-item ${key == index ? "active" : ""}`}
                  onSelect={handleSelect}
                >
                  <div className="scroll-item">
                    <img
                      src={userData.thumbnailUrl}
                      className="d-block w-100 rounded"
                      alt="First slide"
                    />
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                    onClick={() => onClick(count + 1)}
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
                    data-bs-slide="next"
                    onClick={() => onClick(count + 1)}
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
