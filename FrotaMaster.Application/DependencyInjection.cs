using Microsoft.Extensions.DependencyInjection;
using FrotaMaster.Application.Services;

namespace FrotaMaster.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {

            services.AddScoped<VeiculoService>();
            services.AddScoped<MotoristaService>();
            services.AddScoped<ManutencaoService>(); 
            services.AddScoped<UsuarioService>();
            return services;
        }
    }
}
