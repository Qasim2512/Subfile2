/** @format */

import "./Logginn.css";

function LoggInn() {
  return (
    <div className="row">
      <div className="col-md-4">
        <section>
          <form id="account" method="post">
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
                <input
                  className="form-check-input"
                  asp-for="Input.RememberMe"
                />
              </label>
            </div>
            <div>
              <button
                id="login-submit"
                type="submit"
                className="w-100 btn btn-lg btn-primary"
              >
                Log in
              </button>
            </div>
            <div>
              <p>
                <a id="forgot-password">Forgot your password?</a>
              </p>
              <p>
                <a>Register as a new user</a>
              </p>
              <p>
                <a id="resend-confirmation">Resend email confirmation</a>
              </p>
            </div>
          </form>
        </section>
      </div>
      <div className="col-md-6 col-md-offset-2">
        <section>
          <h3>Use another service to log in.</h3>
          <hr />
        </section>
      </div>
    </div>
  );
}

export default LoggInn;

/*@{
                if ((Model.ExternalLogins?.Count ?? 0) == 0)
                {
                    <div>
                        <p>
                            There are no external authentication services configured. See this <a href="https://go.microsoft.com/fwlink/?LinkID=532715">article
                            about setting up this ASP.NET application to support logging in via external services</a>.
                        </p>
                    </div>
                }
                else
                {
                    <form id="external-account" asp-page="./ExternalLogin" asp-route-returnUrl="@Model.ReturnUrl" method="post" className="form-horizontal">
                        <div>
                            <p>
                                @foreach (var provider in Model.ExternalLogins!)
                                {
                                    <button type="submit" className="btn btn-primary" name="provider" value="@provider.Name" title="Log in using your @provider.DisplayName account">@provider.DisplayName</button>
                                }
                            </p>
                        </div>
                    </form>
                }
            }
                
            @Html.DisplayNameFor(m => m.Input.RememberMe)*/
