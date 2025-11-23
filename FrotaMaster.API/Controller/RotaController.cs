using Microsoft.AspNetCore.Mvc;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using FrotaMaster.Application.DTOs;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace FrotaMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RotaController : ControllerBase
    {
        private readonly IRotaRepository _repo;
        public RotaController(IRotaRepository repo) => _repo = repo;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _repo.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var rota = await _repo.GetByIdAsync(id);
            return rota == null ? NotFound() : Ok(rota);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRotaRequest request)
        {
            var rota = new Rota
            {
                VeiculoId = request.VeiculoId,
                MotoristaId = request.MotoristaId,
                Origem = request.Origem,
                Destino = request.Destino,
                Carga = request.Carga,
                Status = "Agendada"
            };

            await _repo.AddAsync(rota);
            await _repo.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = rota.Id }, rota);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Rota rota)
        {
            if (id != rota.Id) return BadRequest();
            await _repo.UpdateAsync(rota);
            await _repo.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteAsync(id);
            await _repo.SaveChangesAsync();
            return NoContent();
        }
    }
}