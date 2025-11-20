namespace FrotaMaster.Domain.Entities
{
    public class DistribuicaoRota
    {
        public int Id { get; set; }
        public int RotaId { get; set; }
        public Rota Rota { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime DataRegistro { get; set; } = DateTime.UtcNow;
        public string Observacao { get; set; } = string.Empty;
        public string Status { get; set; } 
    }
}
