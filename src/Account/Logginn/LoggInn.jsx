/** @format */

import "./Logginn.css";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoggInn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleLoggInn() {
    if (email.trim().length === 0) {
      setEmailError("Write email");
      return;
    } else {
      setEmailError("");
    }

    if (password.trim().length === 0) {
      setPasswordError("Write password?");
      return;
    } else {
      setPasswordError("");
    }

    Cookies.set("logginn", "sant");
    navigate("/");
  }

  return (
    <div className="row">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label">Email</label>
              <span className="text-danger">{emailError}</span>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                autocomplete="current-password"
                aria-required="true"
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label">Password</label>
              <span className="text-danger">{passwordError}</span>
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
    </div>
  );
}

export default LoggInn;
