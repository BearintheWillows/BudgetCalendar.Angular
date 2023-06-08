namespace BudgetCalendar.Server.Data.Models.DTOs;

public class AccountDto
{
    public int     Id      { get; set; }
    public string? Name    { get; set; } 
    public decimal? Balance { get; set; }
    
    public DateTime? Modified { get; set; }
    
}
