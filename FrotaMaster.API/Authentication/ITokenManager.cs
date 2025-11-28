using FrotaMaster.Domain.Entities;

namespace FrotaMaster.Application
{
    public interface ITokenManager
    {
        string GerarToken(Usuario usuario);
        string GerarRefreshToken(Usuario usuario);
    }
}
