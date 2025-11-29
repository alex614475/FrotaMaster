using FrotaMaster.Application.Authentication;
using FrotaMaster.Application.DTOs;
using FrotaMaster.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FrotaMaster.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class AuthController : ControllerBase
{
    private readonly ITokenManager _tokenManager;
    private readonly IUsuarioRepository _usuarioRepository;

    public AuthController(ITokenManager tokenManager, IUsuarioRepository usuarioRepository)
    {
        _tokenManager = tokenManager;
        _usuarioRepository = usuarioRepository;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var usuario = await _usuarioRepository.GetByEmailAsync(request.Email);
        if (usuario is null || !BCrypt.Net.BCrypt.Verify(request.Senha, usuario.Senha))
            return Unauthorized("Email ou senha incorretos");

        var token = _tokenManager.GerarToken(usuario);
        var refreshToken = _tokenManager.GerarRefreshToken(usuario);

        return Ok(new LoginResponseDto
        {
            Usuario = new UsuarioResponseDto
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email,
                Perfil = usuario.Perfil,
                Ativo = usuario.Ativo
            },
            Token = token
        });
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        var result = await _tokenManager.ValidateTokenAsync(request.RefreshToken);
        if (!result.isValid)
            return Unauthorized();

        var usuario = await _usuarioRepository.GetByEmailAsync(result.nomeUsuario);
        if (usuario is null)
            return Unauthorized();

        var token = _tokenManager.GerarToken(usuario);
        var refreshToken = _tokenManager.GerarRefreshToken(usuario);

        return Ok(new LoginResponseDto
        {
            Usuario = new UsuarioResponseDto
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email,
                Perfil = usuario.Perfil,
                Ativo = usuario.Ativo
            },
            Token = token
        });
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me() => Ok(new { Message = "Você está autenticado" });
}
