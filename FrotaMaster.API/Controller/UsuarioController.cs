using FrotaMaster.Application.DTOs;
using FrotaMaster.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FrotaMaster.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _service;

        public UsuarioController(UsuarioService service)
        {
            _service = service;
        }

        [HttpPost("criar")]
        public async Task<IActionResult> Criar(CreateUsuarioRequest dto)
        {
            return Ok(await _service.CriarAsync(dto));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest dto)
        {
            return Ok(await _service.LoginAsync(dto));
        }

        [Authorize]
        [HttpPut("atualizar")]
        public async Task<IActionResult> Atualizar(UpdateUsuarioRequest dto)
        {
            return Ok(await _service.AtualizarAsync(dto));
        }

        [Authorize]
        [HttpPut("alterar-senha")]
        public async Task<IActionResult> AlterarSenha(UpdateSenhaRequest dto)
        {
            await _service.AlterarSenhaAsync(dto);
            return NoContent();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _service.GetByIdAsync(id));
        }
    }
}
