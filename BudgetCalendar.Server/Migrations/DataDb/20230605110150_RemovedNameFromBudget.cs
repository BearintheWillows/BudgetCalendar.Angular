using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BudgetCalendar.Server.Migrations.DataDb
{
    /// <inheritdoc />
    public partial class RemovedNameFromBudget : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: "66734d29-5aeb-4aa4-9851-42a526b7a0e3");

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: "88eeeb40-3aca-4339-8235-f1790de73d3f");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Budgets");

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "175bf9d2-3988-4115-9d3c-8d88d3300ded", null, "User", "USER" },
                    { "3909e3fd-ab8e-4155-8c47-a80d956da0a9", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: "175bf9d2-3988-4115-9d3c-8d88d3300ded");

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: "3909e3fd-ab8e-4155-8c47-a80d956da0a9");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Budgets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "66734d29-5aeb-4aa4-9851-42a526b7a0e3", null, "User", "USER" },
                    { "88eeeb40-3aca-4339-8235-f1790de73d3f", null, "Admin", "ADMIN" }
                });
        }
    }
}
