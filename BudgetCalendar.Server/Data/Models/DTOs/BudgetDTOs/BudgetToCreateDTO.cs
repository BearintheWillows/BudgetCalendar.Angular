using BudgetCalendar.Server.Data.Enums;

namespace BudgetCalendar.Server.Data.Models.DTOs.BudgetDTOs;

public class BudgetToCreateDTO
{
    public decimal Amount { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public TransactionType TransactionType { get; set; }

    public int AccountId { get; set; }

    public int CategoryId { get; set; }
}
