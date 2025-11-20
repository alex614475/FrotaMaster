namespace FrotaMaster.Domain.Entities
{
    public class Rota
    {
        public int Id { get; set; }
        public int VeiculoId { get; set; }
        public Veiculo Veiculo { get; set; } = null!;
        public int MotoristaId { get; set; }
        public Motorista Motorista { get; set; } = null!;
        public string Origem { get; set; } = string.Empty;
        public string Destino { get; set; } = string.Empty;
        public string Status { get; set; } = "Agendada";
        public string Carga { get; set; } = string.Empty;
        public string Cidade { get; set; } = string.Empty;        
        public string TipoVeiculo { get; set; } = string.Empty;   
        public string MotoristaNome { get; set; } = string.Empty;    
        public List<DistribuicaoRota> Distribuicoes { get; set; } = new();
        
    }
}
