using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservasApi.Controllers;
using ReservasApi.Data;
using ReservasApi.Models;

namespace ReservasApi.Tests;

public class ReservasControllerTests
{
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
        await using var contexto = CrearContexto();
        var controlador = new ReservasController(contexto);

        var reserva = new Reserva
        {
            NombreCliente = "Agus",
            Lugar = "Restaurante Centro",
            FechaHora = DateTimeOffset.UtcNow.AddDays(1),
            CantidadPersonas = 2
        };

        var resultado = await controlador.Crear(reserva);

        Assert.IsType<CreatedAtActionResult>(resultado.Result);
        Assert.Single(contexto.Reservas);
        Assert.Equal("Agus", contexto.Reservas.Single().NombreCliente);
    }

    [Fact]
    public async Task Crear_ConFechaPasada_RechazaLaReserva()
    {
        await using var contexto = CrearContexto();
        var controlador = new ReservasController(contexto);

        var reserva = new Reserva
        {
            NombreCliente = "Agus",
            Lugar = "Restaurante Centro",
            FechaHora = DateTimeOffset.UtcNow.AddDays(-1),
            CantidadPersonas = 2
        };

        var resultado = await controlador.Crear(reserva);

        Assert.IsType<BadRequestObjectResult>(resultado.Result);
        Assert.Empty(contexto.Reservas);
    }

    [Fact]
    public async Task Actualizar_ReservaExistente_ModificaLosDatos()
    {
        await using var contexto = CrearContexto();

        var reserva = new Reserva
        {
            NombreCliente = "Nombre anterior",
            Lugar = "Lugar anterior",
            FechaHora = DateTimeOffset.UtcNow.AddDays(1),
            CantidadPersonas = 1
        };

        contexto.Reservas.Add(reserva);
        await contexto.SaveChangesAsync();

        var controlador = new ReservasController(contexto);

        var datosNuevos = new Reserva
        {
            NombreCliente = "Nombre nuevo",
            Lugar = "Lugar nuevo",
            FechaHora = DateTimeOffset.UtcNow.AddDays(2),
            CantidadPersonas = 4
        };

        var resultado = await controlador.Actualizar(
            reserva.Id,
            datosNuevos
        );

        Assert.IsType<NoContentResult>(resultado);
        Assert.Equal(
            "Nombre nuevo",
            contexto.Reservas.Single().NombreCliente
        );
        Assert.Equal(4, contexto.Reservas.Single().CantidadPersonas);
    }

    [Fact]
    public async Task Eliminar_ReservaExistente_LaQuitaDeLaBase()
    {
        await using var contexto = CrearContexto();

        var reserva = new Reserva
        {
            NombreCliente = "Agus",
            Lugar = "Restaurante Centro",
            FechaHora = DateTimeOffset.UtcNow.AddDays(1),
            CantidadPersonas = 2
        };

        contexto.Reservas.Add(reserva);
        await contexto.SaveChangesAsync();

        var controlador = new ReservasController(contexto);

        var resultado = await controlador.Eliminar(reserva.Id);

        Assert.IsType<NoContentResult>(resultado);
        Assert.Empty(contexto.Reservas);
    }
}
