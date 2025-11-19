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

        public DbSet<Veiculo> Veiculos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Veiculo>(entity =>
            {
                // Especificar o nome exato da tabela no PostgreSQL
                entity.ToTable("veiculos");

                entity.HasKey(v => v.Id);
                entity.Property(v => v.Placa)
                    .IsRequired()
                    .HasMaxLength(10);
                entity.Property(v => v.Modelo)
                    .IsRequired()
                    .HasMaxLength(100);
                entity.Property(v => v.Status)
                    .HasMaxLength(20)
                    .HasDefaultValue("Disponivel");
                entity.Property(v => v.Quilometragem)
                    .HasDefaultValue(0);
            });
        }
    }
}