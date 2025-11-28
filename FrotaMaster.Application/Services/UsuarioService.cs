using FrotaMaster.Application.DTOs;
using FrotaMaster.Domain.Entities;
using FrotaMaster.Domain.Repositories;

namespace FrotaMaster.Application.Services
{
    public class UsuarioService
    {
        private readonly IUsuarioRepository _repo;

        public UsuarioService(IUsuarioRepository repo)
        {
            _repo = repo;
        }

        public async Task<UsuarioResponseDto> CriarAsync(CreateUsuarioRequest request)
        {
            if (await _repo.EmailExistsAsync(request.Email))
                throw new Exception("Email já cadastrado.");

            var usuario = new Usuario
            {
                Nome = request.Nome,
                Email = request.Email,
                Perfil = request.Perfil,
                Ativo = true,
                Senha = BCrypt.Net.BCrypt.HashPassword(request.Senha)
            };

            await _repo.AddAsync(usuario);
            await _repo.SaveChangesAsync();

            return Map(usuario);
        }

        public async Task<LoginResponseDto> LoginAsync(LoginRequest request)
        {
            var usuario = await _repo.GetByEmailAsync(request.Email)
                ?? throw new Exception("Usuário não encontrado.");

            if (!BCrypt.Net.BCrypt.Verify(request.Senha, usuario.Senha))
                throw new Exception("Senha incorreta.");

            return new LoginResponseDto
            {
                Usuario = Map(usuario),
                Token = "" // vamos implementar o JWT depois
            };
        }

        public async Task<UsuarioResponseDto> AtualizarAsync(UpdateUsuarioRequest request)
        {
            var usuario = await _repo.GetByIdAsync(request.Id)
                ?? throw new Exception("Usuário não encontrado.");

            usuario.Nome = request.Nome;
            usuario.Email = request.Email;
            usuario.Perfil = request.Perfil;
            usuario.Ativo = request.Ativo;

            await _repo.UpdateAsync(usuario);
            await _repo.SaveChangesAsync();

            return Map(usuario);
        }

        public async Task AlterarSenhaAsync(UpdateSenhaRequest request)
        {
            var usuario = await _repo.GetByIdAsync(request.Id)
                ?? throw new Exception("Usuário não encontrado.");

            if (!BCrypt.Net.BCrypt.Verify(request.SenhaAtual, usuario.Senha))
                throw new Exception("Senha atual incorreta.");

            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(request.NovaSenha);

            await _repo.UpdateAsync(usuario);
            await _repo.SaveChangesAsync();
        }

        public async Task<UsuarioResponseDto> GetByIdAsync(int id)
        {
            var usuario = await _repo.GetByIdAsync(id)
                ?? throw new Exception("Usuário não encontrado.");

            return Map(usuario);
        }

        private UsuarioResponseDto Map(Usuario u)
        {
            return new UsuarioResponseDto
            {
                Id = u.Id,
                Nome = u.Nome,
                Email = u.Email,
                Perfil = u.Perfil,
                Ativo = u.Ativo
            };
        }
    }
}
