using Microsoft.EntityFrameworkCore;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using FrotaMaster.Infrastructure.Persistence;

namespace FrotaMaster.Infrastructure.Repositories
{
    public class DistribuicaoRotaRepository : IDistribuicaoRotaRepository
    {
        private readonly FrotaMasterDbContext _context;

        public DistribuicaoRotaRepository(FrotaMasterDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DistribuicaoRota>> GetAllAsync()
        {
            return await _context.DistribuicoesRota.ToListAsync();
        }

        public async Task<IEnumerable<DistribuicaoRota>> GetByRotaIdAsync(int rotaId)
        {
            return await _context.DistribuicoesRota
                .Where(d => d.RotaId == rotaId)
                .ToListAsync();
        }

        public async Task<DistribuicaoRota?> GetByIdAsync(int id)
        {
            return await _context.DistribuicoesRota.FindAsync(id);
        }

        public async Task AddAsync(DistribuicaoRota entity)
        {
            await _context.DistribuicoesRota.AddAsync(entity);
        }

        public async Task UpdateAsync(DistribuicaoRota entity)
        {
            _context.DistribuicoesRota.Update(entity);
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            if (entity != null)
            {
                _context.DistribuicoesRota.Remove(entity);
            }
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}