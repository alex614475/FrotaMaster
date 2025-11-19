// FrotaMaster.Domain/Entities/Motorista.cs
namespace FrotaMaster.Domain.Entities
{
    public class Motorista
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string CNH { get; set; } = string.Empty;
        public string CategoriaCNH { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string Status { get; set; } = "Disponivel"; // Disponivel, EmViagem, Ferias

        // Relacionamentos
        public List<Rota> Rotas { get; set; } = new();
    }
}