namespace FrotaMaster.Application.DTOs
{
    public class CreateVeiculoRequest
    {
        public string Placa { get; set; } = string.Empty;
        public string Modelo { get; set; } = string.Empty;
        public string Marca { get; set; } = string.Empty;
        public int Ano { get; set; }
        public int Quilometragem { get; set; }
        public string Status { get; set; } = string.Empty;
    }

    public class UpdateVeiculoRequest
    {
        public int Id { get; set; }
        public string Placa { get; set; } = string.Empty;
        public string Modelo { get; set; } = string.Empty;
        public string Marca { get; set; } = string.Empty;
        public int Ano { get; set; }
        public int Quilometragem { get; set; }
        public string Status { get; set; } = string.Empty;
    }

    public class VeiculoResponseDto
    {
        public int Id { get; set; }
        public string Placa { get; set; } = string.Empty;
        public string Modelo { get; set; } = string.Empty;
        public string Marca { get; set; } = string.Empty;
        public int Ano { get; set; }
        public int Quilometragem { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
