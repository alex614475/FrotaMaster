using Microsoft.AspNetCore.Mvc;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Application.Services;

namespace FrotaMaster.API.Controllers
{
    [ApiController]
    [Route("api/motoristas")]
    public class MotoristaController : ControllerBase
    {
        private readonly MotoristaService _service;

        public MotoristaController(MotoristaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
            => Ok(await _service.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Motorista motorista)
        {
            var result = await _service.CreateAsync(motorista);
            return CreatedAtAction(nameof(GetById), new { id = motorista.Id }, motorista);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Motorista motorista)
        {
            var success = await _service.UpdateAsync(id, motorista);
            if (!success) return BadRequest();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
