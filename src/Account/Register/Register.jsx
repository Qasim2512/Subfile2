/** @format */

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  function handleRegister() {
    if (email.trim().length === 0) {
      setEmailError("Skriv inn en email ");
      return;
    } else {
      setEmailError("");
    }

    if (password.trim().length === 0) {
      setPasswordError("Alle nettsider har passord, hva er ditt?");
      return;
    } else {
      setPasswordError("");
    }

    if (passwordConfirm.trim().length === 0) {
      setPasswordConfirmError("Alle nettsider har passord, hva er ditt?");
      return;
    } else if (password.trim() !== passwordConfirm.trim()) {
      setPasswordConfirmError(
        "Næmen, her var du litt rask. Dine passord stemmer ikke overens. "
      );
      return;
    } else {
      setPasswordConfirmError("");
    }

    Cookies.set("logginn", "sant");
    navigate("/");
  }

  return (
    <div className="row">
      <div className="col-md-4">
        <h2>Create a new account.</h2>
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
          <label>Email</label>
          <span className="text-danger">{emailError}</span>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            autocomplete="new-password"
            aria-required="true"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
          <span className="text-danger">{passwordError}</span>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            autocomplete="new-password"
            aria-required="true"
            placeholder="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <label>Confirm Password</label>
          <span className="text-danger">{passwordConfirmError}</span>
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
    </div>
  );
}

export default Register;
