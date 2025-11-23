namespace FrotaMaster.Application.DTOs
{
    public class CreateDistribuicaoRotaRequest
    {
        public int RotaId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime DataDistribuicao { get; set; }
        public string? Status { get; set; }
        public string? Observacao { get; set; }
    }
}