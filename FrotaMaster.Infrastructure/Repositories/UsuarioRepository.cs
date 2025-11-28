
using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;
using FrotaMaster.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace FrotaMaster.Infrastructure.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly FrotaMasterDbContext _context;

        public UsuarioRepository(FrotaMasterDbContext context)
        {
            _context = context;
        }

        public async Task<Usuario?> GetByIdAsync(int id)
        {
            return await _context.Usuarios.FindAsync(id);
        }

        public async Task<Usuario?> GetByEmailAsync(string email)
        {
            return await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
        }

        public async Task<IEnumerable<Usuario>> GetAllAsync()
        {
            return await _context.Usuarios
                .OrderBy(u => u.Nome)
                .ToListAsync();
        }

        public async Task<IEnumerable<Usuario>> GetByPerfilAsync(string perfil)
        {
            return await _context.Usuarios
                .Where(u => u.Perfil == perfil)
                .OrderBy(u => u.Nome)
                .ToListAsync();
        }

        public async Task<IEnumerable<Usuario>> GetAtivosAsync()
        {
            return await _context.Usuarios
                .Where(u => u.Ativo)
                .OrderBy(u => u.Nome)
                .ToListAsync();
        }

        public async Task AddAsync(Usuario usuario)
        {
            await _context.Usuarios.AddAsync(usuario);
        }

        public async Task UpdateAsync(Usuario usuario)
        {
            _context.Usuarios.Update(usuario);
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(int id)
        {
            var usuario = await GetByIdAsync(id);
            if (usuario != null)
            {
                _context.Usuarios.Remove(usuario);
            }
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Usuarios
                .AnyAsync(u => u.Email.ToLower() == email.ToLower());
        }

        public async Task<Usuario?> GetByEmailAndSenhaAsync(string email, string senha)
        {
            return await _context.Usuarios
                .FirstOrDefaultAsync(u =>
                    u.Email.ToLower() == email.ToLower() &&
                    u.Senha == senha &&
                    u.Ativo
                );
        }

        //public async Task UpdateUltimoLoginAsync(int usuarioId)
        //{
        //    var usuario = await GetByIdAsync(usuarioId);
        //    if (usuario != null)
        //    {
        //        usuario.UltimoLogin = DateTime.UtcNow;
        //        _context.Usuarios.Update(usuario);
        //    }
        //}
    }
}
