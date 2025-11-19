using Microsoft.AspNetCore.Mvc;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using FrotaMaster.API.DTOs;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace FrotaMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManutencaoController : ControllerBase
    {
        private readonly IManutencaoRepository _repo;
        public ManutencaoController(IManutencaoRepository repo) => _repo = repo;

        [HttpGet] public async Task<IActionResult> GetAll() => Ok(await _repo.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var manutencao = await _repo.GetByIdAsync(id);
            return manutencao == null ? NotFound() : Ok(manutencao);
        }

        [HttpGet("veiculo/{veiculoId}")] public async Task<IActionResult> GetByVeiculo(int veiculoId) => Ok(await _repo.GetByVeiculoIdAsync(veiculoId));

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateManutencaoRequest request)
        {
            var manutencao = new Manutencao
            {
                VeiculoId = request.VeiculoId,
                Tipo = request.Tipo,
                Descricao = request.Descricao,
                Custo = request.Custo,
                Status = request.Status
            };

            await _repo.AddAsync(manutencao);
            await _repo.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = manutencao.Id }, manutencao);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Manutencao manutencao)
        {
            if (id != manutencao.Id) return BadRequest();
            await _repo.UpdateAsync(manutencao);
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