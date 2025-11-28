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
            // DbContext
            services.AddDbContext<FrotaMasterDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("PostgreSQLConnection"))
            );

            // Repositórios
            services.AddScoped<IVeiculoRepository, VeiculoRepository>();
            services.AddScoped<IMotoristaRepository, MotoristaRepository>();
            services.AddScoped<IManutencaoRepository, ManutencaoRepository>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();

            return services;
        }
    }
}
