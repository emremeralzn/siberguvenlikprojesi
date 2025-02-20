using Cyberapp.Persistence;
using Cyberapp.Persistence.Seed;
using Microsoft.EntityFrameworkCore;
using Cyberapp.Application.Users;
using Cyberapp.Application.Interfaces;
using Cyberapp.Application.Services;
using Cyberapp.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Database connection
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=CyberSecurityDb.db"));
builder.Services.AddScoped<IEducationService, EducationService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddHostedService<ExpiredUserCleanupService>();



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});


// Add controllers
builder.Services.AddControllers();
builder.Services.AddAuthorization();


builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();

    // Veritabanını seed et
    SeedData.Initialize(context);
}

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors("AllowAll");
app.MapControllers();

app.Run();
