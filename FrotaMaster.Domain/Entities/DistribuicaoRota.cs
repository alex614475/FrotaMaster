using FrotaMaster.Domain.Entities;

public class DistribuicaoRota
{
    public int Id { get; set; }
    public int RotaId { get; set; }
    public Rota Rota { get; set; } = null!;  // Remova 'required' e use null!
    public double Latitude { get; set; }     // Mude de decimal para double
    public double Longitude { get; set; }    // Mude de decimal para double
    public DateTime DataDistribuicao { get; set; }
    public DateTime DataRegistro { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = null!; // Remova 'required' e use null!
    public string? Observacao { get; set; }
}