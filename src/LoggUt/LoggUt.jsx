function LoggUt(){
    return(
        <div>
    <h1>@ViewData["Title"]</h1>

</div>
    )

}

export default LoggUt;

/*    @{
        if (User.Identity?.IsAuthenticated ?? false)
        {
            <form class="form-inline" asp-area="Identity" asp-page="/Account/Logout"
                asp-route-returnUrl="@Url.Page("/", new { area = "" })" method="post">
                <button type="submit" class="nav-link btn btn-link text-dark my-20">Click here to logout</button>
            </form>
        }
        else
        {
            <p>You have successfully logged out of the application.</p>
        }
    } */