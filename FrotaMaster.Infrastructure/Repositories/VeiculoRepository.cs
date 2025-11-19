using Microsoft.EntityFrameworkCore;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using FrotaMaster.Infrastructure.Persistence;
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
        }

        public async Task DeleteAsync(int id)
        {
            var veiculo = await _context.Veiculos.FindAsync(id);
            if (veiculo != null)
            {
                _context.Veiculos.Remove(veiculo);
            }
        }

        public async Task<IEnumerable<Veiculo>> GetAllAsync()
        {
            return await _context.Veiculos.AsNoTracking().ToListAsync();
        }

        public async Task<Veiculo?> GetByIdAsync(int id)
        {
            return await _context.Veiculos
                .AsNoTracking() // Evita problemas de tracking
                .FirstOrDefaultAsync(v => v.Id == id);
        }

        public async Task UpdateAsync(Veiculo veiculo)
        {
            // Método seguro: buscar a entidade existente e atualizar valores
            var existingVeiculo = await _context.Veiculos.FindAsync(veiculo.Id);
            if (existingVeiculo != null)
            {
                _context.Entry(existingVeiculo).CurrentValues.SetValues(veiculo);
            }
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}