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
    public class VeiculoController : ControllerBase
    {
        private readonly IVeiculoRepository _repo;
        public VeiculoController(IVeiculoRepository repo) => _repo = repo;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _repo.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var veiculo = await _repo.GetByIdAsync(id);
            return veiculo == null ? NotFound() : Ok(veiculo);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateVeiculoRequest request)
        {
            var veiculo = new Veiculo
            {
                Placa = request.Placa,
                Modelo = request.Modelo,
                Marca = request.Marca,
                Ano = request.Ano,
                Quilometragem = request.Quilometragem,
                Status = request.Status
            };

            await _repo.AddAsync(veiculo);
            await _repo.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = veiculo.Id }, veiculo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Veiculo veiculo)
        {
            if (id != veiculo.Id) return BadRequest();
            await _repo.UpdateAsync(veiculo);
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