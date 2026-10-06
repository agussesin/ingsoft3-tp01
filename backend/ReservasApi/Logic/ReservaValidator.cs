using ReservasApi.Models;

namespace ReservasApi.Logic;

public static class ReservaValidator
{
    public const int LargoMaximoNombre = 100;
    public const int LargoMaximoLugar = 100;
    public const int MinimoPersonas = 1;
    public const int MaximoPersonas = 20;

    public record Resultado(bool EsValida, string? Error);

    public static Resultado Validar(Reserva reserva, DateTimeOffset ahora)
    {
        if (string.IsNullOrWhiteSpace(reserva.NombreCliente))
            return new Resultado(false, "El nombre del cliente es obligatorio.");

        if (reserva.NombreCliente.Length > LargoMaximoNombre)
            return new Resultado(false, $"El nombre del cliente no puede superar los {LargoMaximoNombre} caracteres.");

        if (string.IsNullOrWhiteSpace(reserva.Lugar))
            return new Resultado(false, "El lugar es obligatorio.");

        if (reserva.Lugar.Length > LargoMaximoLugar)
            return new Resultado(false, $"El lugar no puede superar los {LargoMaximoLugar} caracteres.");

        if (reserva.CantidadPersonas < MinimoPersonas ||
            reserva.CantidadPersonas > MaximoPersonas)
            return new Resultado(false, $"La cantidad de personas debe estar entre {MinimoPersonas} y {MaximoPersonas}.");

        if (reserva.FechaHora <= ahora)
            return new Resultado(false, "La fecha de la reserva debe ser futura.");

        return new Resultado(true, null);
    }
}
