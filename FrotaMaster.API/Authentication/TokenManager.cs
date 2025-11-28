using FrotaMaster.Application;  
using FrotaMaster.Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FrotaMaster.Infrastructure
{
    public class TokenManager : ITokenManager
    {
        private readonly IConfiguration _config;

        public TokenManager(IConfiguration config)
        {
            _config = config;
        }

        public string GerarToken(Usuario usuario)
        {
            var key = Encoding.UTF8.GetBytes(_config["JwtSettings:SecretKey"]);
            var creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("id", usuario.Id.ToString()),
                new Claim("nome", usuario.Nome),
                new Claim("perfil", usuario.Perfil),
                new Claim("ativo", usuario.Ativo.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, usuario.Email)
            };

            var expiracaoMin = int.Parse(_config["JwtSettings:ExpirationTimeInMinutes"]);

            var token = new JwtSecurityToken(
                issuer: _config["JwtSettings:Issuer"],
                audience: _config["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiracaoMin),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GerarRefreshToken(Usuario usuario)
        {
            return Guid.NewGuid().ToString();
        }

        public Task<(bool isValid, string? Nome)> ValidateTokenAsync(string token)
        {
            return Task.FromResult((true, "ok"));
        }
    }
}
