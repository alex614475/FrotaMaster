using FrotaMaster.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FrotaMaster.Domain.Repositories
{
    public interface IVeiculoRepository
    {
        Task<Veiculo?> GetByIdAsync(int id);
        Task<IEnumerable<Veiculo>> GetAllAsync();
        Task AddAsync(Veiculo veiculo);
        Task UpdateAsync(Veiculo veiculo);
        Task DeleteAsync(int id);
    }
}
