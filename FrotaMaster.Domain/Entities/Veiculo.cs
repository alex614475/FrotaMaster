// FrotaMaster.Domain/Entities/Veiculo.cs
namespace FrotaMaster.Domain.Entities
{
    public class Veiculo
    {
        public int Id { get; set; }
        public string Placa { get; set; } = string.Empty;
        public string Modelo { get; set; } = string.Empty;
        public string Marca { get; set; } = string.Empty;
        public int Ano { get; set; }
        public int Quilometragem { get; set; }
        public string Status { get; set; } = "Disponivel"; // Disponivel, EmManutencao, EmUso

        // Relacionamentos
        public List<Manutencao> Manutencoes { get; set; } = new();
        public List<Rota> Rotas { get; set; } = new();
    }
}