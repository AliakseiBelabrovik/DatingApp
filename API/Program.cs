using API;
using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddApplicationServices(builder.Configuration); //we outsouces some logic to a separate file
builder.Services.AddIdentityServices(builder.Configuration);


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>(); //should come before http


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//CORS -> allow for specific addresses
app.UseCors(corsPolicyBuilder => corsPolicyBuilder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));


app.UseHttpsRedirection();
//auth middleware should be after CORS and before controllers
app.UseAuthentication(); //first authenticate -> check if you have a valid token
app.UseAuthorization(); //tells what are you allowed to do, when you have the valid token

app.MapControllers();

using var scope = app.Services.CreateScope(); //gives access to all services inside of program.cs
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(context);
}
catch (Exception ex)
{
    var logger = services.GetService<ILogger<Program>>();
    logger?.LogError(ex, "An error occurred during migration");
}

app.Run();
