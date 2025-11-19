namespace FrotaMaster.Domain.Entities
{
    public class Manutencao
    {
        public int Id { get; set; }
        public int VeiculoId { get; set; }
        public Veiculo Veiculo { get; set; } = null!;
        public string Tipo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public decimal Custo { get; set; }
        public string Status { get; set; } = "Agendada";
    }
}