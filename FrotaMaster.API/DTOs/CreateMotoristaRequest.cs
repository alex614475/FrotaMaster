namespace FrotaMaster.API.DTOs
{
	public class CreateMotoristaRequest
	{
		public string Nome { get; set; } = string.Empty;
		public string CNH { get; set; } = string.Empty;
		public string CategoriaCNH { get; set; } = string.Empty;
		public string Telefone { get; set; } = string.Empty;
		public string Status { get; set; } = "Disponivel";
	}
}