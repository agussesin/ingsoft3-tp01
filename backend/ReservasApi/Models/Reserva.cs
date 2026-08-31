using System.ComponentModel.DataAnnotations;

namespace ReservasApi.Models;

public class Reserva
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string NombreCliente { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Lugar { get; set; } = string.Empty;

    public DateTimeOffset FechaHora { get; set; }

    [Range(1, 20)]
    public int CantidadPersonas { get; set; }
}
