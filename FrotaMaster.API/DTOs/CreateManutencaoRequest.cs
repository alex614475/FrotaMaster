namespace FrotaMaster.API.DTOs
{
    public class CreateManutencaoRequest
    {
        public int VeiculoId { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public decimal Custo { get; set; }
        public string Status { get; set; } = "Agendada";
    }
}