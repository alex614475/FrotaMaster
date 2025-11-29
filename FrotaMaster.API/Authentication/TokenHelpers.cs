using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FrotaMaster.API.Authentication
{
    internal static class TokenHelpers
    {
        public static TokenValidationParameters GetTokenValidationParameters(IConfiguration configuration)
        {
            var secret = configuration["JwtSettings:SecretKey"];
            if (string.IsNullOrEmpty(secret))
                throw new InvalidOperationException("JWT SecretKey não configurada.");

            var tokenKey = Encoding.UTF8.GetBytes(secret);

            return new TokenValidationParameters
            {
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
                ValidateAudience = true,
                ValidAudience = configuration["JwtSettings:Audience"],
                ValidateIssuer = true,
                ValidIssuer = configuration["JwtSettings:Issuer"],
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(tokenKey),
            };
        }
    }
}
