using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using FrotaMaster.Infrastructure.Persistence;
using FrotaMaster.Domain.Repositories;
using FrotaMaster.Infrastructure.Repositories;

namespace FrotaMaster.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            // PostgreSQL Configuration
            services.AddDbContext<FrotaMasterDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("PostgreSQLConnection")));

            // Repositories
            services.AddScoped<IVeiculoRepository, VeiculoRepository>();

            return services;
        }
    }
}