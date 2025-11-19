using Microsoft.AspNetCore.Mvc;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System;

namespace FrotaMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VeiculoController : ControllerBase
    {
        private readonly IVeiculoRepository _repo;

        public VeiculoController(IVeiculoRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Veiculo veiculo)
        {
            try
            {
                await _repo.AddAsync(veiculo);
                await _repo.SaveChangesAsync();
                return CreatedAtAction(nameof(GetById), new { id = veiculo.Id }, veiculo);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Erro ao criar veículo", details = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var veiculo = await _repo.GetByIdAsync(id);
                if (veiculo == null) return NotFound();
                return Ok(veiculo);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Erro ao buscar veículo", details = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var veiculos = await _repo.GetAllAsync();
                return Ok(veiculos);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Erro ao listar veículos", details = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Veiculo veiculo)
        {
            try
            {
                if (id != veiculo.Id)
                    return BadRequest(new { error = "ID do veículo não corresponde" });

                var existingVeiculo = await _repo.GetByIdAsync(id);
                if (existingVeiculo == null)
                    return NotFound(new { error = "Veículo não encontrado" });

                await _repo.UpdateAsync(veiculo);
                await _repo.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Erro ao atualizar veículo", details = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var veiculo = await _repo.GetByIdAsync(id);
                if (veiculo == null) return NotFound();

                await _repo.DeleteAsync(id);
                await _repo.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Erro ao deletar veículo", details = ex.Message });
            }
        }

        [HttpGet("test-db")]
        public async Task<IActionResult> TestDatabase()
        {
            try
            {
                var veiculos = await _repo.GetAllAsync();
                var veiculosList = veiculos.ToList();

                return Ok(new
                {
                    message = "Conexão com PostgreSQL funcionando!",
                    totalVeiculos = veiculosList.Count,
                    veiculos = veiculosList
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}