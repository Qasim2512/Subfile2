/** @format */
import { useState } from "react";
import Cookies from "js-cookie";

function Register() {
  const loggInnCookies = Cookies.get("logginn");
  const [loggedInn, setIsLoggedIn] = useState(loggInnCookies);

  function handleRegister() {
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
            <h2>Create a new account.</h2>
            <hr />
            <div
              asp-validation-summary="ModelOnly"
              className="text-danger"
              role="alert"
            ></div>
            <div className="form-floating mb-3">
              <input
                asp-for="Input.Email"
                className="form-control"
                autocomplete="username"
                aria-required="true"
                placeholder="name@example.com"
              />
              <label asp-for="Input.Email">Email</label>
              <span
                asp-validation-for="Input.Email"
                className="text-danger"
              ></span>
            </div>
            <div className="form-floating mb-3">
              <input
                asp-for="Input.Password"
                className="form-control"
                autocomplete="new-password"
                aria-required="true"
                placeholder="password"
              />
              <label asp-for="Input.Password">Password</label>
              <span
                asp-validation-for="Input.Password"
                className="text-danger"
              ></span>
            </div>
            <div className="form-floating mb-3">
              <input
                asp-for="Input.ConfirmPassword"
                className="form-control"
                autocomplete="new-password"
                aria-required="true"
                placeholder="password"
              />
              <label asp-for="Input.ConfirmPassword">Confirm Password</label>
              <span
                asp-validation-for="Input.ConfirmPassword"
                className="text-danger"
              ></span>
            </div>
            <button
              id="registerSubmit"
              type="submit"
              className="w-100 btn btn-lg btn-primary"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
          <div className="col-md-6 col-md-offset-2">
            <section>
              <h3>Use another service to register.</h3>
              <hr />
            </section>
          </div>
        </>
      )}
    </div>
  );
}

export default Register;
