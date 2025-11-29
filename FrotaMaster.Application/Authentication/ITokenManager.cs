using FrotaMaster.Domain.Entities;

namespace FrotaMaster.Application.Authentication;

public interface ITokenManager
{
    string GerarToken(Usuario usuario);
    string GerarRefreshToken(Usuario usuario);
    Task<(bool isValid, string nomeUsuario)> ValidateTokenAsync(string token);
}
