using ReservasApi.Logic;
using ReservasApi.Models;

namespace ReservasApi.Tests;

public class ReservaValidatorTests
{
    private static readonly DateTimeOffset Ahora =
        new DateTimeOffset(2026, 9, 30, 18, 0, 0, TimeSpan.Zero);

    private static Reserva CrearReservaValida()
    {
        return new Reserva
        {
            NombreCliente = "Agus",
            Lugar = "Restaurante Centro",
            FechaHora = Ahora.AddDays(1),
            CantidadPersonas = 2
        };
    }

    [Fact]
    public void FechaFutura_EsValida()
    {
        // Arrange
        var reserva = CrearReservaValida();

        // Act
        var resultado = ReservaValidator.Validar(reserva, Ahora);

        // Assert
        Assert.True(resultado.EsValida);
        Assert.Null(resultado.Error);
    }

    [Fact]
    public void FechaPasada_EsRechazada()
    {
        // Arrange
        var reserva = CrearReservaValida();
        reserva.FechaHora = Ahora.AddMinutes(-1);

        // Act
        var resultado = ReservaValidator.Validar(reserva, Ahora);

        // Assert
        Assert.False(resultado.EsValida);
        Assert.Contains("futura", resultado.Error);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    [InlineData(21)]
    [InlineData(100)]
    public void CantidadFueraDeRango_EsRechazada(int cantidad)
    {
        // Arrange
        var reserva = CrearReservaValida();
        reserva.CantidadPersonas = cantidad;

        // Act
        var resultado = ReservaValidator.Validar(reserva, Ahora);

        // Assert
        Assert.False(resultado.EsValida);
        Assert.Contains("entre 1 y 20", resultado.Error);
    }

    [Fact]
    public void NombreVacio_EsRechazado()
    {
        // Arrange
        var reserva = CrearReservaValida();
        reserva.NombreCliente = "   ";

        // Act
        var resultado = ReservaValidator.Validar(reserva, Ahora);

        // Assert
        Assert.False(resultado.EsValida);
        Assert.Contains("nombre", resultado.Error, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public void LugarVacio_EsRechazado()
    {
        // Arrange
        var reserva = CrearReservaValida();
        reserva.Lugar = "";

        // Act
        var resultado = ReservaValidator.Validar(reserva, Ahora);

        // Assert
        Assert.False(resultado.EsValida);
        Assert.Contains("lugar", resultado.Error, StringComparison.OrdinalIgnoreCase);
    }
}
