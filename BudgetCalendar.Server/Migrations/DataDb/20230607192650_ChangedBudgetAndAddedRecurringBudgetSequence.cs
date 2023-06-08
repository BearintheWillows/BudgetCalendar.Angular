using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetCalendar.Server.Migrations.DataDb
{
    /// <inheritdoc />
    public partial class ChangedBudgetAndAddedRecurringBudgetSequence : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Budgets");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Budgets",
                newName: "Date");

            migrationBuilder.AddColumn<byte[]>(
                name: "Icon",
                table: "Budgets",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "Budgets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "RecurringBudgetSequenceId",
                table: "Budgets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "RecurringBudgetSequence",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Interval = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecurringBudgetSequence", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Budgets_RecurringBudgetSequenceId",
                table: "Budgets",
                column: "RecurringBudgetSequenceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Budgets_RecurringBudgetSequence_RecurringBudgetSequenceId",
                table: "Budgets",
                column: "RecurringBudgetSequenceId",
                principalTable: "RecurringBudgetSequence",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Budgets_RecurringBudgetSequence_RecurringBudgetSequenceId",
                table: "Budgets");

            migrationBuilder.DropTable(
                name: "RecurringBudgetSequence");

            migrationBuilder.DropIndex(
                name: "IX_Budgets_RecurringBudgetSequenceId",
                table: "Budgets");

            migrationBuilder.DropColumn(
                name: "Icon",
                table: "Budgets");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "Budgets");

            migrationBuilder.DropColumn(
                name: "RecurringBudgetSequenceId",
                table: "Budgets");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Budgets",
                newName: "StartDate");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Budgets",
                type: "datetime2",
                nullable: true);
        }
    }
}
