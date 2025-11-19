using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FrotaMaster.Infrastructure.Migrations
{
	/// <inheritdoc />
	public partial class InitialCreate : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				name: "Veiculos",
				columns: table => new
				{
					Id = table.Column<int>(type: "integer", nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					Placa = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
					Modelo = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
					Ano = table.Column<int>(type: "integer", nullable: false),
					Quilometragem = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
					Status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Disponivel")
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Veiculos", x => x.Id);
				});
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "Veiculos");
		}
	}
}