/** @format */

import "./Logginn.css";
import Cookies from "js-cookie";
import { useState } from "react";

function LoggInn() {
  const loggInnCookies = Cookies.get("logginn");
  const [loggedInn, setIsLoggedIn] = useState(loggInnCookies);

  function handleLoggInn() {
    Cookies.set("logginn", "sant");
    setIsLoggedIn(true);
  }

  return (
    <div className="row">
      {loggedInn ? (
        <a href="/" className="my-5">
          Gå tilbake til hjemsiden
        </a>
      ) : (
        <>
          <div className="col-md-4">
            <section>
              <h2>Use a local account to log in.</h2>
              <hr />
              <div className="text-danger" role="alert"></div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  autocomplete="username"
                  aria-required="true"
                  placeholder="name@example.com"
                />
                <label className="form-label">Email</label>
                <span className="text-danger"></span>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  autocomplete="current-password"
                  aria-required="true"
                  placeholder="password"
                />
                <label className="form-label">Password</label>
                <span
                  asp-validation-for="Input.Password"
                  className="text-danger"
                ></span>
              </div>
              <div className="checkbox mb-3">
                <label className="form-label">
                  Remember me
                  <input className="form-check-input mx-2" type="checkbox" />
                </label>
              </div>
              <div>
                <button
                  id="login-submit"
                  className="w-100 btn btn-lg btn-primary my-2"
                  onClick={handleLoggInn}
                >
                  Log in
                </button>
              </div>
              <div>
                <p>
                  <a id="forgot-password" href="/forgotpassword">
                    Forgot your password?
                  </a>
                </p>
                <p>
                  <a href="/register">Register as a new user</a>
                </p>
              </div>
            </section>
          </div>
          <div className="col-md-6 col-md-offset-2">
            <section>
              <h3>Use another service to log in.</h3>
              <hr />
            </section>
          </div>
        </>
      )}
    </div>
  );
}

export default LoggInn;
