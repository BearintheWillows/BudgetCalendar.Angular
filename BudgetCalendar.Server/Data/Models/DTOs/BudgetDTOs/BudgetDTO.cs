using BudgetCalendar.Server.Data.Enums;

namespace BudgetCalendar.Server.Data.Models.DTOs.BudgetDTOs;

public class BudgetDTO
{
    public int Id { get; set; }
    public decimal Amount { get; set; } = 0;
    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public DateTime? Modified { get; set; }

    public string TransactionType { get; set; }

}
