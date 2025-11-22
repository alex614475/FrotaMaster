using FrotaMaster.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FrotaMaster.Domain.Repositories
{
    public interface IManutencaoRepository
    {
        Task<Manutencao?> GetByIdAsync(int id);
        Task<IEnumerable<Manutencao>> GetAllAsync();
        Task<IEnumerable<Manutencao>> GetByVeiculoIdAsync(int veiculoId);
        Task AddAsync(Manutencao manutencao);
        Task UpdateAsync(Manutencao manutencao);
        Task DeleteAsync(int id);
        Task SaveChangesAsync();

        Task<Manutencao?> GetByIdIncludingVeiculoAsync(int id);
        Task<IEnumerable<Manutencao>> GetAllIncludingVeiculoAsync();
    }
}
