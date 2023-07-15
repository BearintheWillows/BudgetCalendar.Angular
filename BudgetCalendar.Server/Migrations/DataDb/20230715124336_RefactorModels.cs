using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetCalendar.Server.Migrations.DataDb
{
    /// <inheritdoc />
    public partial class RefactorModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsArchived",
                table: "Budgets");

            migrationBuilder.DropColumn(
                name: "IsArchived",
                table: "Accounts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsArchived",
                table: "Budgets",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsArchived",
                table: "Accounts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
