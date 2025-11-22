namespace FrotaMaster.API.DTOs
{
    // DTO para criação de Motorista
    public class CreateMotoristaRequest
    {
        public string Nome { get; set; } = string.Empty;
        public string CNH { get; set; } = string.Empty;
        public string CategoriaCNH { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string Status { get; set; } = "Disponivel";
    }

    // DTO para atualização de Motorista
    public class UpdateMotoristaRequest
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string CNH { get; set; } = string.Empty;
        public string CategoriaCNH { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string Status { get; set; } = "Disponivel";
    }

    // DTO de resposta para Motorista
    public class MotoristaResponseDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string CNH { get; set; } = string.Empty;
        public string CategoriaCNH { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
