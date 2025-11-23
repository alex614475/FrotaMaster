using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FrotaMaster.Application.Services
{
    public class MotoristaService
    {
        private readonly IMotoristaRepository _motoristaRepository;

        public MotoristaService(IMotoristaRepository motoristaRepository)
        {
            _motoristaRepository = motoristaRepository;
        }

        public async Task<IEnumerable<Motorista>> GetAllAsync()
        {
            return await _motoristaRepository.GetAllAsync();
        }

        public async Task<Motorista?> GetByIdAsync(int id)
        {
            return await _motoristaRepository.GetByIdAsync(id);
        }

        public async Task<Motorista> CreateAsync(Motorista motorista)
        {
            await _motoristaRepository.AddAsync(motorista);
            await _motoristaRepository.SaveChangesAsync();
            return motorista;
        }

        public async Task<bool> UpdateAsync(int id, Motorista motorista)
        {
            if (motorista.Id != id) return false;

            await _motoristaRepository.UpdateAsync(motorista);
            await _motoristaRepository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            await _motoristaRepository.DeleteAsync(id);
            await _motoristaRepository.SaveChangesAsync();
            return true;
        }
    }
}
