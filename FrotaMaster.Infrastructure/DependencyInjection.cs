using Scrutor;
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
            services.AddDatabase(configuration);
            services.AddRepositories();

            return services;
        }

        // -----------------------------
        // DATABASE
        // -----------------------------
        private static IServiceCollection AddDatabase(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<FrotaMasterDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            return services;
        }

        // -----------------------------
        // REPOSITORIES
        // -----------------------------
        private static IServiceCollection AddRepositories(
            this IServiceCollection services)
        {
            // Se quiser adicionar manualmente:
            services.AddScoped<IVeiculoRepository, VeiculoRepository>();

            // Registro automático de todos os repositórios na pasta Infrastructure.Repositories
            services.Scan(scan => scan
                .FromAssemblyOf<VeiculoRepository>()
                .AddClasses(classes =>
                    classes.InNamespaceOf<VeiculoRepository>()) // garante que pega os repositórios da pasta
                .AsImplementedInterfaces()
                .WithScopedLifetime());

            return services;
        }
    }
}
