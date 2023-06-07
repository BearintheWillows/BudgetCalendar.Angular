using BudgetCalendar.Server.Data.Enums;

namespace BudgetCalendar.Server.Data.Models.DTOs;

public class BudgetToCreateDto
{
    public decimal Amount { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string TransactionType { get; set; }

    public int AccountId { get; set; }

    public int CategoryId { get; set; }

    public string? ReccuringInterval { get; set; }

}
