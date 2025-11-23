using Microsoft.AspNetCore.Mvc;
using FrotaMaster.Domain.Repositories;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Application.DTOs;
using System.Linq;
using System.Threading.Tasks;

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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var manutencoes = await _repo.GetAllIncludingVeiculoAsync();
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var m = await _repo.GetByIdIncludingVeiculoAsync(id);
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
        public async Task<IActionResult> Update(int id, [FromBody] UpdateManutencaoRequest request)
        {
            if (id != request.Id) return BadRequest();

            var manutencao = await _repo.GetByIdAsync(id);
            if (manutencao == null) return NotFound();

            manutencao.VeiculoId = request.VeiculoId;
            manutencao.Tipo = request.Tipo;
            manutencao.Descricao = request.Descricao;
            manutencao.Custo = request.Custo;
            manutencao.Status = request.Status;

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
