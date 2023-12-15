using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        //configure db context for data context / appusers -> we need to provide options -> connection string
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });

        //CORS 
        services.AddCors();

        //scoped is a standard for http requests inside a controller
        services.AddScoped<ITokenService, TokenService>(); //we need the token service to create the token, no more
        //or add signleton -> service created as soon as the app starts and lives the whole time (e.g., caching service)

        return services;
    }

}
