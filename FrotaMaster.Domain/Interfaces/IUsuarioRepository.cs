using FrotaMaster.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FrotaMaster.Domain.Repositories
{
    public interface IUsuarioRepository
    {
        Task<Usuario?> GetByIdAsync(int id);
        Task<Usuario?> GetByEmailAsync(string email);
        Task<IEnumerable<Usuario>> GetAllAsync();
        Task<IEnumerable<Usuario>> GetByPerfilAsync(string perfil);
        Task<IEnumerable<Usuario>> GetAtivosAsync();

        Task AddAsync(Usuario usuario);
        Task UpdateAsync(Usuario usuario);
        Task DeleteAsync(int id);
        Task SaveChangesAsync();

        // Métodos adicionais
        Task<bool> EmailExistsAsync(string email);
        Task<Usuario?> GetByEmailAndSenhaAsync(string email, string senha);
        //Task UpdateUltimoLoginAsync(int usuarioId);
    }
}
