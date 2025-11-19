using Microsoft.EntityFrameworkCore;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using FrotaMaster.Infrastructure.Persistence;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FrotaMaster.Infrastructure.Repositories
{
    public class MotoristaRepository : IMotoristaRepository
    {
        private readonly FrotaMasterDbContext _context;
        public MotoristaRepository(FrotaMasterDbContext context) => _context = context;

        public async Task AddAsync(Motorista motorista) => await _context.Motoristas.AddAsync(motorista);
        public async Task DeleteAsync(int id)
        {
            var motorista = await _context.Motoristas.FindAsync(id);
            if (motorista != null) _context.Motoristas.Remove(motorista);
        }
        public async Task<IEnumerable<Motorista>> GetAllAsync() => await _context.Motoristas.AsNoTracking().ToListAsync();
        public async Task<Motorista?> GetByIdAsync(int id) => await _context.Motoristas.FindAsync(id);
        public async Task UpdateAsync(Motorista motorista)
        {
            var existing = await _context.Motoristas.FindAsync(motorista.Id);
            if (existing != null) _context.Entry(existing).CurrentValues.SetValues(motorista);
        }
        public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
    }
}