using Microsoft.EntityFrameworkCore;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using FrotaMaster.Infrastructure.Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrotaMaster.Infrastructure.Repositories
{
    public class ManutencaoRepository : IManutencaoRepository
    {
        private readonly FrotaMasterDbContext _context;
        public ManutencaoRepository(FrotaMasterDbContext context) => _context = context;

        public async Task AddAsync(Manutencao manutencao) =>
            await _context.Manutencoes.AddAsync(manutencao);

        public async Task DeleteAsync(int id)
        {
            var manutencao = await _context.Manutencoes.FindAsync(id);
            if (manutencao != null)
                _context.Manutencoes.Remove(manutencao);
        }

        public async Task<IEnumerable<Manutencao>> GetAllAsync() =>
            await _context.Manutencoes.AsNoTracking().Include(m => m.Veiculo).ToListAsync();

        public async Task<Manutencao?> GetByIdAsync(int id) =>
            await _context.Manutencoes.Include(m => m.Veiculo).FirstOrDefaultAsync(m => m.Id == id);

        public async Task<IEnumerable<Manutencao>> GetByVeiculoIdAsync(int veiculoId) =>
            await _context.Manutencoes.AsNoTracking().Where(m => m.VeiculoId == veiculoId).ToListAsync();

        public async Task UpdateAsync(Manutencao manutencao)
        {
            var existing = await _context.Manutencoes.FindAsync(manutencao.Id);
            if (existing != null)
                _context.Entry(existing).CurrentValues.SetValues(manutencao);
        }

        public async Task SaveChangesAsync() => await _context.SaveChangesAsync();

        public async Task<Manutencao?> GetByIdIncludingVeiculoAsync(int id) =>
            await _context.Manutencoes.Include(m => m.Veiculo).FirstOrDefaultAsync(m => m.Id == id);

        public async Task<IEnumerable<Manutencao>> GetAllIncludingVeiculoAsync() =>
            await _context.Manutencoes.Include(m => m.Veiculo).AsNoTracking().ToListAsync();
    }
}
