using Microsoft.AspNetCore.Mvc;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace FrotaMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MotoristaController : ControllerBase
    {
        private readonly IMotoristaRepository _repo;
        public MotoristaController(IMotoristaRepository repo) => _repo = repo;

        [HttpGet] public async Task<IActionResult> GetAll() => Ok(await _repo.GetAllAsync());
        [HttpGet("{id}")] public async Task<IActionResult> GetById(int id) => Ok(await _repo.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Motorista motorista)
        {
            await _repo.AddAsync(motorista);
            await _repo.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = motorista.Id }, motorista);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Motorista motorista)
        {
            if (id != motorista.Id) return BadRequest();
            await _repo.UpdateAsync(motorista);
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