using Microsoft.AspNetCore.Mvc;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using FrotaMaster.API.DTOs; // ← Esta linha deve existir
using System.Threading.Tasks;

namespace FrotaMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DistribuicaoRotaController : ControllerBase
    {
        private readonly IDistribuicaoRotaRepository _repo;

        public DistribuicaoRotaController(IDistribuicaoRotaRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("rota/{rotaId}")]
        public async Task<IActionResult> GetByRota(int rotaId)
        {
            return Ok(await _repo.GetByRotaIdAsync(rotaId));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _repo.GetByIdAsync(id);
            return item == null ? NotFound() : Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateDistribuicaoRotaRequest request)
        {
            var item = new DistribuicaoRota
            {
                RotaId = request.RotaId,
                Latitude = request.Latitude,
                Longitude = request.Longitude,
                DataRegistro = DateTime.UtcNow,
                Observacao = request.Observacao
            };

            await _repo.AddAsync(item);
            await _repo.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] DistribuicaoRota item)
        {
            if (id != item.Id) return BadRequest();

            await _repo.UpdateAsync(item);
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