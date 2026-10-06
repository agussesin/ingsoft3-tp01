using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservasApi.Data;
using ReservasApi.Logic;
using ReservasApi.Services;
using ReservasApi.Models;

namespace ReservasApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReservasController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IClock _clock;

    public ReservasController(AppDbContext context, IClock clock)
    {
        _context = context;
        _clock = clock;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Reserva>>> ObtenerTodas()
    {
        var reservas = await _context.Reservas
            .OrderBy(reserva => reserva.FechaHora)
            .ToListAsync();

        return Ok(reservas);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Reserva>> ObtenerPorId(int id)
    {
        var reserva = await _context.Reservas.FindAsync(id);

        if (reserva is null)
        {
            return NotFound();
        }

        return Ok(reserva);
    }

    [HttpPost]
    public async Task<ActionResult<Reserva>> Crear(Reserva reserva)
    {
        var validacion = ReservaValidator.Validar(
            reserva,
            _clock.Now
        );

        if (!validacion.EsValida)
        {
            return BadRequest(new
            {
                mensaje = validacion.Error
            });
        }

        reserva.Id = 0;
        reserva.FechaHora = reserva.FechaHora.ToUniversalTime();

        _context.Reservas.Add(reserva);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(ObtenerPorId),
            new { id = reserva.Id },
            reserva
        );
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Actualizar(int id, Reserva datos)
    {
        var validacion = ReservaValidator.Validar(
            datos,
            _clock.Now
        );

        if (!validacion.EsValida)
        {
            return BadRequest(new
            {
                mensaje = validacion.Error
            });
        }

        var reserva = await _context.Reservas.FindAsync(id);

        if (reserva is null)
        {
            return NotFound();
        }

        reserva.NombreCliente = datos.NombreCliente;
        reserva.Lugar = datos.Lugar;
        reserva.FechaHora = datos.FechaHora.ToUniversalTime();
        reserva.CantidadPersonas = datos.CantidadPersonas;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Eliminar(int id)
    {
        var reserva = await _context.Reservas.FindAsync(id);

        if (reserva is null)
        {
            return NotFound();
        }

        _context.Reservas.Remove(reserva);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}