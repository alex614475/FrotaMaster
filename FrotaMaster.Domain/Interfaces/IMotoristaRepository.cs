using FrotaMaster.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FrotaMaster.Domain.Repositories
{
    public interface IMotoristaRepository
    {
        Task<Motorista?> GetByIdAsync(int id);
        Task<IEnumerable<Motorista>> GetAllAsync();
        Task AddAsync(Motorista motorista);
        Task UpdateAsync(Motorista motorista);
        Task DeleteAsync(int id);
        Task SaveChangesAsync();
    }
}