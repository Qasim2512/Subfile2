/** @format */

import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbarMain">
      <nav className="navbar navbar-expand-sm navbar-light box-shadow fixed-top py-3 bg-dark">
        <div className="container-fluid navbarMain">
          <a className="navbar-brand text-light">PixNote</a>
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
                >
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link text-light" id="scrollViewButton">
                  Scroll View
                </a>
              </li>

              <li>
                <a className="nav-link text-light" id="scrollViewButton">
                  Upload Image
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

/*


                    <ul className="navbar-nav">
                        @if (User.Identity.IsAuthenticated)
                        {
                            <li className="nav-item">
                                <span className="text-light">Greetings, @User.Identity.Name</span>
                                <a className="btn btn-danger mx-2" asp-area="Identity" asp-page="/Account/Logout">Logout</a>
                            </li>
                        }
                        else
                        {
                            <li className="nav-item">
                                <a className="btn btn-primary mt-2" asp-area="Identity" asp-page="/Account/Login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="btn btn-success mt-2" asp-area="Identity"
                                    asp-page="/Account/Register">Register</a>
                            </li>
                        }
                    </ul>
    <div className="logOutContainer">
        <main role="main" className="logout">
            @RenderBody()
        </main>
    </div>

    <footer className="border-top footer text-muted footerMain">
        <div className="container">
            &copy; 2024 - PixNote - <a asp-area="" asp-controller="Home" asp-action="Privacy">Privacy</a>
        </div>
    </footer>

    <script src="~/lib/jquery/dist/jquery.min.js"></script>
    <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="~/js/site.js" asp-append-version="true"></script>


    <script>
        $(document).ready(function () {

            var isAuthenticated = '@User.Identity.IsAuthenticated'.toLowerCase();

            if (isAuthenticated === "false") {
                $('#uploadImageButton').click(function (event) {
                    event.preventDefault();
                    alert("You must be logged in to upload an image.");
                });
            }
        });
    </script>

    @await RenderSectionAsync("Scripts", required: false)

*/
