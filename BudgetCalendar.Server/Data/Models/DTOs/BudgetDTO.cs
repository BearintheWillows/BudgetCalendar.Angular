using BudgetCalendar.Server.Data.Enums;

namespace BudgetCalendar.Server.Data.Models.DTOs;

public class BudgetDto
{
    public int Id { get; set; }
    public decimal Amount { get; set; } = 0;
    
    public DateTime Date { get; set; } = DateTime.Now;
    
    public bool IsArchived { get; set; } = false;

    public DateTime? Modified { get; set; }
    
    public string? Note { get; set; }
    
    public string? Color { get; set; }
    
    public byte[]? Icon { get; set; } 
    
    public AccountDto Account { get; set; } = null!;
    
    public CategoryDto Category        { get; set; } = null!; 
    public string             TransactionType { get; set; }
    
    public RecurringBudgetSequenceDto RecurringBudgetSequence { get; set; } = null!;

}
