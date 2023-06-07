using BudgetCalendar.Server.Data.Enums;

namespace BudgetCalendar.Server.Data.Models.DTOs.BudgetDTOs;

public class BudgetToUpdateDTO
{
    public int Id { get; set; }
    
    public decimal Amount { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public int AccountId { get; set; }

    public int CategoryId { get; set; }

    public TransactionType TransactionType { get; set; }

    public bool IsArchived { get; set; }
}
