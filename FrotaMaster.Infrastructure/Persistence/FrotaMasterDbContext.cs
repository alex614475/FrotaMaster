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
        public DbSet<Motorista> Motoristas { get; set; }
        public DbSet<Manutencao> Manutencoes { get; set; }
        public DbSet<Rota> Rotas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração Veiculo
            modelBuilder.Entity<Veiculo>(e =>
            {
                e.ToTable("veiculos");
                e.HasKey(v => v.Id);
                e.Property(v => v.Placa).IsRequired().HasMaxLength(10);
                e.Property(v => v.Modelo).IsRequired().HasMaxLength(50);
                e.Property(v => v.Marca).IsRequired().HasMaxLength(30);
                e.Property(v => v.Status).HasMaxLength(20).HasDefaultValue("Disponivel");
            });

            // Configuração Motorista
            modelBuilder.Entity<Motorista>(e =>
            {
                e.ToTable("motoristas");
                e.HasKey(m => m.Id);
                e.Property(m => m.Nome).IsRequired().HasMaxLength(100);
                e.Property(m => m.CNH).IsRequired().HasMaxLength(20);
                e.Property(m => m.CategoriaCNH).HasMaxLength(5);
                e.Property(m => m.Status).HasMaxLength(20).HasDefaultValue("Disponivel");
            });

            // Configuração Manutencao
            modelBuilder.Entity<Manutencao>(e =>
            {
                e.ToTable("manutencoes");
                e.HasKey(m => m.Id);
                e.Property(m => m.Tipo).IsRequired().HasMaxLength(50);
                e.Property(m => m.Status).HasMaxLength(20).HasDefaultValue("Agendada");
                e.Property(m => m.Custo).HasColumnType("decimal(10,2)");
                e.HasOne(m => m.Veiculo).WithMany(v => v.Manutencoes).HasForeignKey(m => m.VeiculoId);
            });

            // Configuração Rota
            modelBuilder.Entity<Rota>(e =>
            {
                e.ToTable("rotas");
                e.HasKey(r => r.Id);
                e.Property(r => r.Origem).IsRequired().HasMaxLength(100);
                e.Property(r => r.Destino).IsRequired().HasMaxLength(100);
                e.Property(r => r.Status).HasMaxLength(20).HasDefaultValue("Agendada");
                e.HasOne(r => r.Veiculo).WithMany(v => v.Rotas).HasForeignKey(r => r.VeiculoId);
                e.HasOne(r => r.Motorista).WithMany(m => m.Rotas).HasForeignKey(r => r.MotoristaId);
            });
        }
    }
}