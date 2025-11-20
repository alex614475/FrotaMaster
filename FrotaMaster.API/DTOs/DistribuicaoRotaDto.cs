using System.ComponentModel.DataAnnotations;

namespace FrotaMaster.API.DTOs
{
    public class CreateDistribuicaoRotaRequest
    {
        [Required]
        public int RotaId { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

        public string Observacao { get; set; } = string.Empty;
    }
}