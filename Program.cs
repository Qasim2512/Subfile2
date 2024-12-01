using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PixNote.Models;
using PixNote.Services;  
using Microsoft.AspNetCore.Identity.UI.Services;
using Serilog;
using Serilog.Events;
using PixNote.DAL; 

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<PhotoDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("PhotoDbContextConnection")));


builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<PhotoDbContext>()
    .AddDefaultTokenProviders();


builder.Services.AddControllersWithViews();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var loggerConfiguration = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.File($"APILogs/app_{DateTime.Now:yyyyMMdd_HHmmss}.log")
    .Filter.ByExcluding(e => e.Properties.TryGetValue("SourceContext", out var value) &&
                            e.Level == LogEventLevel.Information &&
                            e.MessageTemplate.Text.Contains("Executed DbCommand"));
var logger = loggerConfiguration.CreateLogger();
builder.Logging.AddSerilog(logger);

// Register the DummyEmailSender for IEmailSender
builder.Services.AddTransient<IEmailSender, DummyEmailSender>();



var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use Static Files to serve images or other static content
app.UseStaticFiles();

// Enable routing
app.UseRouting();

// Enable CORS middleware
app.UseCors("AllowReactApp");

// Enable authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

// Map Razor Pages and MVC routes (default route handling)
app.MapRazorPages();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
