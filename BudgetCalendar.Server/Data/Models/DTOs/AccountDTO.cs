namespace BudgetCalendar.Server.Data.Models.DTOs;

public class AccountDTO
{
    public int     Id { get; set; }
    public string  Name { get; set; } = string.Empty;
    public decimal Balance { get; set; }
    
}
