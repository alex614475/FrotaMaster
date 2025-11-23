namespace FrotaMaster.Application.DTOs
{
    public class CreateRotaRequest
    {
        public int VeiculoId { get; set; }
        public int MotoristaId { get; set; }
        public string Origem { get; set; } = string.Empty;
        public string Destino { get; set; } = string.Empty;
        public string Carga { get; set; } = string.Empty;
    }
}