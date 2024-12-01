/** @format */

function Register() {
  return (
    <div className="row">
      <div className="col-md-4">
        <form
          id="registerForm"
          asp-route-returnUrl="@Model.ReturnUrl"
          method="post"
        >
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
          >
            Register
          </button>
        </form>
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

/* @{
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
            }*/
