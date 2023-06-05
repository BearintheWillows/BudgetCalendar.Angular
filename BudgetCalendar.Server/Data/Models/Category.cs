namespace BudgetCalendar.Server.Data.Models;

public class Category {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ICollection<Budget> Budgets { get; set; } = new List<Budget>();
    // public string? UserId { get; set; }
    // public User? User { get; set; }
}