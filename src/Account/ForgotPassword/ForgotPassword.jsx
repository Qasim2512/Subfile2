/** @format */

import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  function handleReset() {
    navigate("/logginn");
  }
  return (
    <div className="row">
      <h2>Enter your email.</h2>
      <hr />
      <div className="col-md-4">
        <div className="text-danger" role="alert"></div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            autocomplete="username"
            aria-required="true"
            placeholder="name@example.com"
          />
          <label className="form-label"></label>
          <span className="text-danger"></span>
        </div>
        <button
          type="submit"
          className="w-100 btn btn-lg btn-primary"
          onClick={handleReset}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
