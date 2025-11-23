using Microsoft.AspNetCore.Mvc;
using FrotaMaster.Application.Services;
using FrotaMaster.Application.DTOs;
using System.Threading.Tasks;

namespace FrotaMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManutencaoController : ControllerBase
    {
        private readonly ManutencaoService _service;

        public ManutencaoController(ManutencaoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateManutencaoRequest request)
        {
            var result = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateManutencaoRequest request)
        {
            var success = await _service.UpdateAsync(id, request);
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
