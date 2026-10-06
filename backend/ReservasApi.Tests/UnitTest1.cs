using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservasApi.Controllers;
using ReservasApi.Data;
using ReservasApi.Models;
using ReservasApi.Services;
using Moq;

namespace ReservasApi.Tests;

public class ReservasControllerTests
{
    private sealed class FakeClock : IClock
    {
        public DateTimeOffset Now { get; set; } =
            new DateTimeOffset(2026, 9, 30, 18, 0, 0, TimeSpan.Zero);
    }

    private static AppDbContext CrearContexto()
    {
        var opciones = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(opciones);
    }

    [Fact]
    public async Task Crear_ConFechaFutura_GuardaLaReserva()
    {
        // Arrange
        await using var contexto = CrearContexto();
        var clock = new FakeClock();
        var controlador = new ReservasController(contexto, clock);

        var reserva = new Reserva
        {
            NombreCliente = "Agus",
            Lugar = "Restaurante Centro",
            FechaHora = clock.Now.AddDays(1),
            CantidadPersonas = 2
        };

        // Act
        var resultado = await controlador.Crear(reserva);

        // Assert
        Assert.IsType<CreatedAtActionResult>(resultado.Result);
        Assert.Single(contexto.Reservas);
        Assert.Equal("Agus", contexto.Reservas.Single().NombreCliente);
    }

    [Fact]
    public async Task Crear_ConFechaPasada_RechazaLaReserva()
    {
        // Arrange
        await using var contexto = CrearContexto();
        var clock = new FakeClock();
        var controlador = new ReservasController(contexto, clock);

        var reserva = new Reserva
        {
            NombreCliente = "Agus",
            Lugar = "Restaurante Centro",
            FechaHora = clock.Now.AddDays(-1),
            CantidadPersonas = 2
        };

        // Act
        var resultado = await controlador.Crear(reserva);

        // Assert
        Assert.IsType<BadRequestObjectResult>(resultado.Result);
        Assert.Empty(contexto.Reservas);
    }

    [Fact]
    public async Task Actualizar_ReservaExistente_ModificaLosDatos()
    {
        // Arrange
        await using var contexto = CrearContexto();
        var clock = new FakeClock();

        var reserva = new Reserva
        {
            NombreCliente = "Nombre anterior",
            Lugar = "Lugar anterior",
            FechaHora = clock.Now.AddDays(1),
            CantidadPersonas = 1
        };

        contexto.Reservas.Add(reserva);
        await contexto.SaveChangesAsync();

        var controlador = new ReservasController(contexto, clock);

        var datosNuevos = new Reserva
        {
            NombreCliente = "Nombre nuevo",
            Lugar = "Lugar nuevo",
            FechaHora = clock.Now.AddDays(2),
            CantidadPersonas = 4
        };

        // Act
        var resultado = await controlador.Actualizar(
            reserva.Id,
            datosNuevos
        );

        // Assert
        Assert.IsType<NoContentResult>(resultado);
        Assert.Equal(
            "Nombre nuevo",
            contexto.Reservas.Single().NombreCliente
        );
        Assert.Equal(
            4,
            contexto.Reservas.Single().CantidadPersonas
        );
    }

    [Fact]
    public async Task Eliminar_ReservaExistente_LaQuitaDeLaBase()
    {
        // Arrange
        await using var contexto = CrearContexto();
        var clock = new FakeClock();

        var reserva = new Reserva
        {
            NombreCliente = "Agus",
            Lugar = "Restaurante Centro",
            FechaHora = clock.Now.AddDays(1),
            CantidadPersonas = 2
        };

        contexto.Reservas.Add(reserva);
        await contexto.SaveChangesAsync();

        var controlador = new ReservasController(contexto, clock);

        // Act
        var resultado = await controlador.Eliminar(reserva.Id);

        // Assert
        Assert.IsType<NoContentResult>(resultado);
        Assert.Empty(contexto.Reservas);
    }
    [Fact]
    public async Task Crear_ConsultaElRelojUnaVez()
    {
        // Arrange
        await using var contexto = CrearContexto();

        var clock = new Mock<IClock>();
        var ahora = new DateTimeOffset(
            2026, 9, 30, 18, 0, 0,
            TimeSpan.Zero
        );

        clock
            .Setup(c => c.Now)
            .Returns(ahora);

        var controlador = new ReservasController(
            contexto,
            clock.Object
        );

        var reserva = new Reserva
        {
            NombreCliente = "Agus",
            Lugar = "Restaurante Centro",
            FechaHora = ahora.AddDays(1),
            CantidadPersonas = 2
        };

        // Act
        await controlador.Crear(reserva);

        // Assert
        clock.Verify(
            c => c.Now,
            Times.Once
        );
    }
}
