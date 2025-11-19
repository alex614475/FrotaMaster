using Microsoft.EntityFrameworkCore;
using FrotaMaster.Domain.Entities;

namespace FrotaMaster.Infrastructure.Persistence
{
    public class FrotaMasterDbContext : DbContext
    {
        public FrotaMasterDbContext(DbContextOptions<FrotaMasterDbContext> options)
            : base(options)
        {
        }

        public DbSet<Veiculo> Veiculos { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Veiculo>(b =>
            {
                b.HasKey(v => v.Id);
                b.Property(v => v.Placa).IsRequired();
                b.Property(v => v.Modelo).IsRequired();
                b.Property(v => v.Status).HasMaxLength(50);
            });
        }
    }
}
