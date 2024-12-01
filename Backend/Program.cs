using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PixNote.Models;
using PixNote.Services;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "PixNote API", Version = "v1" });
    c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());

    // Add Bearer token security for Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid JWT token",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});

// Configure the database context (Ensure this connection string exists in your appsettings.json)
builder.Services.AddDbContext<PhotoDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("PhotoDbContextConnection")));

// Configure Identity
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<PhotoDbContext>()
    .AddDefaultTokenProviders();

// Add MVC and Razor Pages
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

// Add controllers for API functionality
builder.Services.AddControllers();

// Configure CORS to allow any origin, method, and header
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());
});

// Register the DummyEmailSender for IEmailSender (You can replace this with a real email service)
builder.Services.AddTransient<IEmailSender, DummyEmailSender>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "PixNote API V1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseStaticFiles(); // Serves static files (e.g., images, CSS, JS)
app.UseRouting(); // Enables routing

// Enable CORS with the "CorsPolicy" name
app.UseCors("CorsPolicy");

// Authentication and Authorization
app.UseAuthentication();
app.UseAuthorization();

// Map Razor Pages and controllers
app.MapRazorPages(); // Maps Razor Pages
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"); // Default route for controllers

// Add custom API routing (if needed)
app.MapControllerRoute(name: "api", pattern: "api/{controller}/{action=Index}/{id?}");

app.Run();
