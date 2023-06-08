using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetCalendar.Server.Migrations.DataDb
{
    /// <inheritdoc />
    public partial class RefactoredBudget : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Budgets_RecurringBudgetSequence_RecurringBudgetSequenceId",
                table: "Budgets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecurringBudgetSequence",
                table: "RecurringBudgetSequence");

            migrationBuilder.RenameTable(
                name: "RecurringBudgetSequence",
                newName: "RecurringBudgetSequences");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecurringBudgetSequences",
                table: "RecurringBudgetSequences",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Budgets_RecurringBudgetSequences_RecurringBudgetSequenceId",
                table: "Budgets",
                column: "RecurringBudgetSequenceId",
                principalTable: "RecurringBudgetSequences",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Budgets_RecurringBudgetSequences_RecurringBudgetSequenceId",
                table: "Budgets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecurringBudgetSequences",
                table: "RecurringBudgetSequences");

            migrationBuilder.RenameTable(
                name: "RecurringBudgetSequences",
                newName: "RecurringBudgetSequence");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecurringBudgetSequence",
                table: "RecurringBudgetSequence",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Budgets_RecurringBudgetSequence_RecurringBudgetSequenceId",
                table: "Budgets",
                column: "RecurringBudgetSequenceId",
                principalTable: "RecurringBudgetSequence",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
