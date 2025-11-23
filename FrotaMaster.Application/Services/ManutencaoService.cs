using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using FrotaMaster.Application.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrotaMaster.Application.Services
{
    public class ManutencaoService
    {
        private readonly IManutencaoRepository _repo;

        public ManutencaoService(IManutencaoRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<ManutencaoResponseDto>> GetAllAsync()
        {
            var manutencoes = await _repo.GetAllIncludingVeiculoAsync();

            return manutencoes.Select(m => new ManutencaoResponseDto
            {
                Id = m.Id,
                VeiculoId = m.VeiculoId,
                VeiculoModelo = m.Veiculo?.Modelo ?? string.Empty,
                Tipo = m.Tipo,
                Descricao = m.Descricao,
                Custo = m.Custo,
                Status = m.Status
            });
        }

        public async Task<ManutencaoResponseDto?> GetByIdAsync(int id)
        {
            var m = await _repo.GetByIdIncludingVeiculoAsync(id);
            if (m == null) return null;

            return new ManutencaoResponseDto
            {
                Id = m.Id,
                VeiculoId = m.VeiculoId,
                VeiculoModelo = m.Veiculo?.Modelo ?? string.Empty,
                Tipo = m.Tipo,
                Descricao = m.Descricao,
                Custo = m.Custo,
                Status = m.Status
            };
        }

        public async Task<Manutencao> CreateAsync(CreateManutencaoRequest request)
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
            return manutencao;
        }

        public async Task<bool> UpdateAsync(int id, UpdateManutencaoRequest request)
        {
            if (id != request.Id) return false;

            var manutencao = await _repo.GetByIdAsync(id);
            if (manutencao == null) return false;

            manutencao.VeiculoId = request.VeiculoId;
            manutencao.Tipo = request.Tipo;
            manutencao.Descricao = request.Descricao;
            manutencao.Custo = request.Custo;
            manutencao.Status = request.Status;

            await _repo.UpdateAsync(manutencao);
            await _repo.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            await _repo.DeleteAsync(id);
            await _repo.SaveChangesAsync();
            return true;
        }
    }
}
