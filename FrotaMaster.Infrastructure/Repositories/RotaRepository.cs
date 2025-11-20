using Microsoft.EntityFrameworkCore;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using FrotaMaster.Infrastructure.Persistence;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FrotaMaster.Infrastructure.Repositories
{
    public class RotaRepository : IRotaRepository
    {
        private readonly FrotaMasterDbContext _context;
        public RotaRepository(FrotaMasterDbContext context) => _context = context;

        public async Task AddAsync(Rota rota) => await _context.Rotas.AddAsync(rota);

        public async Task DeleteAsync(int id)
        {
            var rota = await _context.Rotas.FindAsync(id);
            if (rota != null) _context.Rotas.Remove(rota);
        }

        public async Task<IEnumerable<Rota>> GetAllAsync() =>
            await _context.Rotas
                .AsNoTracking()
                .Include(r => r.Veiculo)
                .Include(r => r.Motorista)
                .ToListAsync();

        public async Task<Rota?> GetByIdAsync(int id) =>
            await _context.Rotas
                .Include(r => r.Veiculo)
                .Include(r => r.Motorista)
                .FirstOrDefaultAsync(r => r.Id == id);

        public async Task UpdateAsync(Rota rota)
        {
            var existing = await _context.Rotas.FindAsync(rota.Id);
            if (existing != null)
                _context.Entry(existing).CurrentValues.SetValues(rota);
        }

        public async Task SaveChangesAsync() =>
            await _context.SaveChangesAsync();
    }
}
