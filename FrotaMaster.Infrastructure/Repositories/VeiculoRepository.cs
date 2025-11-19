using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using FrotaMaster.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FrotaMaster.Infrastructure.Repositories
{
    public class VeiculoRepository : IVeiculoRepository
    {
        private readonly FrotaMasterDbContext _context;

        public VeiculoRepository(FrotaMasterDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Veiculo veiculo)
        {
            await _context.Veiculos.AddAsync(veiculo);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var veiculo = await _context.Veiculos.FindAsync(id);
            if (veiculo != null)
            {
                _context.Veiculos.Remove(veiculo);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Veiculo>> GetAllAsync()
        {
            return await _context.Veiculos.ToListAsync();
        }

        public async Task<Veiculo?> GetByIdAsync(int id)
        {
            return await _context.Veiculos.FindAsync(id);
        }

        public async Task UpdateAsync(Veiculo veiculo)
        {
            _context.Veiculos.Update(veiculo);
            await _context.SaveChangesAsync();
        }
    }
}
