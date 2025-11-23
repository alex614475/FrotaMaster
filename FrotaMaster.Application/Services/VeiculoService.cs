using FrotaMaster.Application.DTOs;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;


namespace FrotaMaster.Application.Services
{
    public class VeiculoService
    {
        private readonly IVeiculoRepository _repo;

        public VeiculoService(IVeiculoRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<VeiculoResponseDto>> GetAllAsync()
        {
            var veiculos = await _repo.GetAllAsync();

            var result = new List<VeiculoResponseDto>();
            foreach (var v in veiculos)
            {
                result.Add(new VeiculoResponseDto
                {
                    Id = v.Id,
                    Placa = v.Placa,
                    Modelo = v.Modelo,
                    Marca = v.Marca,
                    Ano = v.Ano,
                    Quilometragem = v.Quilometragem,
                    Status = v.Status
                });
            }

            return result;
        }

        public async Task<VeiculoResponseDto?> GetByIdAsync(int id)
        {
            var v = await _repo.GetByIdAsync(id);
            if (v == null) return null;

            return new VeiculoResponseDto
            {
                Id = v.Id,
                Placa = v.Placa,
                Modelo = v.Modelo,
                Marca = v.Marca,
                Ano = v.Ano,
                Quilometragem = v.Quilometragem,
                Status = v.Status
            };
        }

        public async Task<VeiculoResponseDto> CreateAsync(CreateVeiculoRequest req)
        {
            var veiculo = new Veiculo
            {
                Placa = req.Placa,
                Modelo = req.Modelo,
                Marca = req.Marca,
                Ano = req.Ano,
                Quilometragem = req.Quilometragem,
                Status = req.Status
            };

            await _repo.AddAsync(veiculo);
            await _repo.SaveChangesAsync();

            return new VeiculoResponseDto
            {
                Id = veiculo.Id,
                Placa = veiculo.Placa,
                Modelo = veiculo.Modelo,
                Marca = veiculo.Marca,
                Ano = veiculo.Ano,
                Quilometragem = veiculo.Quilometragem,
                Status = veiculo.Status
            };
        }

        public async Task<bool> UpdateAsync(UpdateVeiculoRequest req)
        {
            var existing = await _repo.GetByIdAsync(req.Id);
            if (existing == null) return false;

            existing.Placa = req.Placa;
            existing.Modelo = req.Modelo;
            existing.Marca = req.Marca;
            existing.Ano = req.Ano;
            existing.Quilometragem = req.Quilometragem;
            existing.Status = req.Status;

            await _repo.UpdateAsync(existing);
            await _repo.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) return false;

            await _repo.DeleteAsync(id);
            await _repo.SaveChangesAsync();
            return true;
        }
    }
}
