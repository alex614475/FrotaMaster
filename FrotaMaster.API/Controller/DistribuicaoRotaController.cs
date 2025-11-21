using Microsoft.AspNetCore.Mvc;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using FrotaMaster.API.DTOs;
using System.Threading.Tasks;

namespace FrotaMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DistribuicaoRotaController : ControllerBase
    {
        private readonly IDistribuicaoRotaRepository _distribuicaoRepo;

        public DistribuicaoRotaController(IDistribuicaoRotaRepository distribuicaoRepo)
        {
            _distribuicaoRepo = distribuicaoRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var distribuicoes = await _distribuicaoRepo.GetAllAsync();
            return Ok(distribuicoes);
        }

        [HttpGet("rota/{rotaId}")]
        public async Task<IActionResult> GetByRota(int rotaId)
        {
            var distribuicoes = await _distribuicaoRepo.GetByRotaIdAsync(rotaId);
            return Ok(distribuicoes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _distribuicaoRepo.GetByIdAsync(id);
            return item == null ? NotFound() : Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateDistribuicaoRotaRequest request)
        {
            // Validação básica
            if (request == null)
                return BadRequest("Request inválido");

            var item = new DistribuicaoRota
            {
                RotaId = request.RotaId,
                Latitude = request.Latitude,
                Longitude = request.Longitude,
                DataDistribuicao = request.DataDistribuicao,
                DataRegistro = DateTime.UtcNow,
                Status = request.Status ?? "Ativa", // Valor padrão
                Observacao = request.Observacao
            };

            await _distribuicaoRepo.AddAsync(item);
            await _distribuicaoRepo.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] DistribuicaoRota item)
        {
            if (id != item.Id)
                return BadRequest("ID mismatch");

            var existingItem = await _distribuicaoRepo.GetByIdAsync(id);
            if (existingItem == null)
                return NotFound();

            await _distribuicaoRepo.UpdateAsync(item);
            await _distribuicaoRepo.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _distribuicaoRepo.GetByIdAsync(id);
            if (item == null)
                return NotFound();

            await _distribuicaoRepo.DeleteAsync(id);
            await _distribuicaoRepo.SaveChangesAsync();

            return NoContent();
        }
    }
}