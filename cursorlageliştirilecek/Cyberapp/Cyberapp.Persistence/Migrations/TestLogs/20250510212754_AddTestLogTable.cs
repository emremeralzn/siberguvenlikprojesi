using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cyberapp.Persistence.Migrations.TestLogs
{
    /// <inheritdoc />
    public partial class AddTestLogTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TestLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    TestName = table.Column<string>(type: "TEXT", nullable: false),
                    IsSuccessful = table.Column<bool>(type: "INTEGER", nullable: false),
                    AttemptedOn = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestLogs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TestLogs_UserId",
                table: "TestLogs",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TestLogs");
        }
    }
}
