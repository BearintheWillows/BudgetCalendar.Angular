using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetCalendar.Server.Migrations.DataDb
{
    /// <inheritdoc />
    public partial class RBSIsNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Budgets_RecurringBudgetSequences_RecurringBudgetSequenceId",
                table: "Budgets");

            migrationBuilder.AlterColumn<int>(
                name: "RecurringBudgetSequenceId",
                table: "Budgets",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Budgets_RecurringBudgetSequences_RecurringBudgetSequenceId",
                table: "Budgets",
                column: "RecurringBudgetSequenceId",
                principalTable: "RecurringBudgetSequences",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Budgets_RecurringBudgetSequences_RecurringBudgetSequenceId",
                table: "Budgets");

            migrationBuilder.AlterColumn<int>(
                name: "RecurringBudgetSequenceId",
                table: "Budgets",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Budgets_RecurringBudgetSequences_RecurringBudgetSequenceId",
                table: "Budgets",
                column: "RecurringBudgetSequenceId",
                principalTable: "RecurringBudgetSequences",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
