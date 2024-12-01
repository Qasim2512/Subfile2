/** @format */

import { useEffect } from "react";
import "./Navbar.css";
import Cookies from "js-cookie";

export default function Navbar() {
  const isLoggedIn = Cookies.get("logginn");

  return (
    <div className="navbarMain">
      <nav className="navbar navbar-expand-sm navbar-light box-shadow fixed-top py-3 bg-dark">
        <div className="container-fluid navbarMain">
          <a className="navbar-brand text-light" href="/">
            PixNote
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <a
                  className="nav-link text-light pe-auto"
                  id="scrollViewButton"
                  href="/"
                >
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link text-light"
                  id="scrollViewButton"
                  href="/scrollView"
                >
                  Scroll View
                </a>
              </li>

              <li>
                <a
                  className="nav-link text-light"
                  id="scrollViewButton"
                  href="/uploadImage"
                >
                  Upload Image
                </a>
              </li>

              {isLoggedIn ? (
                <li className="nav-item">
                  <a
                    className="btn btn-danger mx-2 logInBtn"
                    href="/logginn"
                    onClick={() => Cookies.remove("logginn")}
                  >
                    Logout
                  </a>
                </li>
              ) : (
                <>
                  <li className="nav-item logInBtn">
                    <a className="btn btn-primary" href="/logginn">
                      Login
                    </a>
                  </li>
                  <li className="nav-item registerBtn">
                    <a className="btn btn-success" href="/register">
                      Register
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
