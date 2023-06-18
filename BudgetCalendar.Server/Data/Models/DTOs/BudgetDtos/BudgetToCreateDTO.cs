using BudgetCalendar.Server.Data.Enums;

namespace BudgetCalendar.Server.Data.Models.DTOs.BudgetDtos;

public class BudgetToCreateDto
{
    public decimal Amount { get; set; }

    public DateTime? Date { get; set; }

    public string? Note { get; set; }

    public string? Color { get; set; }

    public string? Icon { get; set; }

    public string TransactionType { get; set; }

    public int AccountId { get; set; }

    public int CategoryId { get; set; }

    public RecurringBudgetSequenceDto? RecurringBudgetSequence { get; set; }

}
