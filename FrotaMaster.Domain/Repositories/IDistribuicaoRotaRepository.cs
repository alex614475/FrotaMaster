using FrotaMaster.Domain.Entities;

namespace FrotaMaster.Domain.Repositories
{
    public interface IDistribuicaoRotaRepository
    {
        Task<IEnumerable<DistribuicaoRota>> GetAllAsync();
        Task<IEnumerable<DistribuicaoRota>> GetByRotaIdAsync(int rotaId);
        Task<DistribuicaoRota?> GetByIdAsync(int id);
        Task AddAsync(DistribuicaoRota entity);
        Task UpdateAsync(DistribuicaoRota entity);
        Task DeleteAsync(int id);
        Task SaveChangesAsync();
    }
}
