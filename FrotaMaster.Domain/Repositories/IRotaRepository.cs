using FrotaMaster.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FrotaMaster.Domain.Repositories
{
    public interface IRotaRepository
    {
        Task<Rota?> GetByIdAsync(int id);
        Task<IEnumerable<Rota>> GetAllAsync();
        Task AddAsync(Rota rota);
        Task UpdateAsync(Rota rota);
        Task DeleteAsync(int id);
        Task SaveChangesAsync();
    }
}