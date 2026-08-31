using Microsoft.EntityFrameworkCore;
using ReservasApi.Models;

namespace ReservasApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Reserva> Reservas { get; set; } = null!;
}
