using Microsoft.AspNetCore.Mvc;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using FrotaMaster.API.DTOs;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace FrotaMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManutencaoController : ControllerBase
    {
        private readonly IManutencaoRepository _repo;

        public ManutencaoController(IManutencaoRepository repo)
        {
            _repo = repo;
        }

        // GET: api/manutencao
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var manutencoes = await _repo.GetAllAsync();

            // Mapeando para DTO com VeiculoModelo
            var response = manutencoes.Select(m => new ManutencaoResponseDto
            {
                Id = m.Id,
                VeiculoId = m.VeiculoId,
                VeiculoModelo = m.Veiculo?.Modelo ?? string.Empty,
                Tipo = m.Tipo,
                Descricao = m.Descricao,
                Custo = m.Custo,
                Status = m.Status
            });

            return Ok(response);
        }

        // GET: api/manutencao/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var m = await _repo.GetByIdAsync(id);
            if (m == null) return NotFound();

            var response = new ManutencaoResponseDto
            {
                Id = m.Id,
                VeiculoId = m.VeiculoId,
                VeiculoModelo = m.Veiculo?.Modelo ?? string.Empty,
                Tipo = m.Tipo,
                Descricao = m.Descricao,
                Custo = m.Custo,
                Status = m.Status
            };

            return Ok(response);
        }

        // GET: api/manutencao/veiculo/4
        [HttpGet("veiculo/{veiculoId}")]
        public async Task<IActionResult> GetByVeiculo(int veiculoId)
        {
            var manutencoes = await _repo.GetByVeiculoIdAsync(veiculoId);

            var response = manutencoes.Select(m => new ManutencaoResponseDto
            {
                Id = m.Id,
                VeiculoId = m.VeiculoId,
                VeiculoModelo = m.Veiculo?.Modelo ?? string.Empty,
                Tipo = m.Tipo,
                Descricao = m.Descricao,
                Custo = m.Custo,
                Status = m.Status
            });

            return Ok(response);
        }

        // POST: api/manutencao
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

            // Retorna DTO
            var veiculo = manutencao.Veiculo; // Pode ser null, dependendo do tracking
            var response = new ManutencaoResponseDto
            {
                Id = manutencao.Id,
                VeiculoId = manutencao.VeiculoId,
                VeiculoModelo = veiculo?.Modelo ?? string.Empty,
                Tipo = manutencao.Tipo,
                Descricao = manutencao.Descricao,
                Custo = manutencao.Custo,
                Status = manutencao.Status
            };

            return CreatedAtAction(nameof(GetById), new { id = manutencao.Id }, response);
        }

        // PUT: api/manutencao/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Manutencao manutencao)
        {
            if (id != manutencao.Id) return BadRequest();

            await _repo.UpdateAsync(manutencao);
            await _repo.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/manutencao/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteAsync(id);
            await _repo.SaveChangesAsync();
            return NoContent();
        }
    }
}
