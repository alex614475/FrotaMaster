using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using FrotaMaster.Infrastructure.Persistence;

#nullable disable

namespace FrotaMaster.Infrastructure.Migrations
{
    [DbContext(typeof(FrotaMasterDbContext))]
    [Migration("20241119000000_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("FrotaMaster.Domain.Entities.Veiculo", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<int>("Ano")
                    .HasColumnType("integer");

                b.Property<string>("Modelo")
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnType("character varying(100)");

                b.Property<string>("Placa")
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasColumnType("character varying(10)");

                b.Property<int>("Quilometragem")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer")
                    .HasDefaultValue(0);

                b.Property<string>("Status")
                    .IsRequired()
                    .ValueGeneratedOnAdd()
                    .HasMaxLength(20)
                    .HasColumnType("character varying(20)")
                    .HasDefaultValue("Disponivel");

                b.HasKey("Id");

                b.ToTable("Veiculos");
            });
#pragma warning restore 612, 618
        }
    }
}