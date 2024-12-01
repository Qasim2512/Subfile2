/** @format */

import "./Carousel.css";
import React, { useEffect, useState } from "react";

export default function Carousel() {
  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/photos?_start=0&_limit=5")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % userData.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? userData.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <h1 className="title">WELCOME TO PIXNOTE</h1>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {userData.map((_, idx) => (
            <button
              key={idx}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={idx}
              className={idx === index ? "active" : ""}
              aria-current={idx === index ? "true" : "false"}
              aria-label={`Slide ${idx + 1}`}
              onClick={() => setIndex(idx)}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {userData.map((data, idx) => (
            <div
              key={data.id}
              className={`carousel-item ${idx === index ? "active" : ""}`}
            >
              <img
                src={data.thumbnailUrl}
                className="d-block w-100 rounded"
                alt={`Slide ${idx + 1}`}
              />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          onClick={handlePrev}
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
          onClick={handleNext}
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
