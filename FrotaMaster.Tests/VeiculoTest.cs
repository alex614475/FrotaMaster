using FrotaMaster.Domain.Entities;
using Xunit;

namespace FrotaMaster.Tests;

public sealed class VeiculoTest



{
    [Theory]
    [InlineData(1, "ABC-1234", "Modelo X", "Marca Y", 1000, 15000, "Disponivel")]
    [InlineData(2, "DEF-5678", "Modelo Z", "Marca W", 2005, 30000, "Indisponivel")]
    [InlineData(3, "GHI-9012", "Modelo A", "Marca B", 2010, 45000, "Em Manutencao")]
    [InlineData(4, "JKL-3456", "Modelo C", "Marca D", 2015, 60000, "Disponivel")]

    public void Construtor_ComDadosValidos_DeveCriarVeiculoComPropriedadesCorretas(
        int arrangeId,
        string arrangePlaca,
        string arrangeModelo,
        string arrangeMarca,
        int arrangeAno,
        int arrangeQuilometragem,
        string arrangeStatus)
    {



        //Act

        var veiculo = new Veiculo
        {
            Id = arrangeId,
            Placa = arrangePlaca,
            Modelo = arrangeModelo,
            Marca = arrangeMarca,
            Ano = arrangeAno,
            Quilometragem = arrangeQuilometragem,
            Status = arrangeStatus
        };



        //Assert

        Assert.Equal(arrangeId, veiculo.Id);
        Assert.Equal(arrangePlaca, veiculo.Placa);
        Assert.Equal(arrangeModelo, veiculo.Modelo);
        Assert.Equal(arrangeMarca, veiculo.Marca);
        Assert.Equal(arrangeAno, veiculo.Ano);
        Assert.Equal(arrangeQuilometragem, veiculo.Quilometragem);
        Assert.Equal(arrangeStatus, veiculo.Status);
    }




    [Theory]
    [InlineData(1900)]
    [InlineData(2000)]
    [InlineData(2020)]
    [InlineData(2025)]
    [InlineData(2026)]
    public void Ano_ComValorValido_DeveConfigurarCorretamente(int veiculoAno)
    {
    

        // Assert
        Assert.True(veiculoAno <= 2025 );
    }
}