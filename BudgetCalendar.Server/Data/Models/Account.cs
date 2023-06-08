namespace BudgetCalendar.Server.Data.Models;

using Interfaces;

public class Account : IHasTimestamps
{
    //TODO: Fix Modified for accounts
    public int      Id         { get; set; }
    public string   Name       { get; set; } = string.Empty;
    public decimal  Balance    { get; set; }
    public bool     IsArchived { get; set; } = false;
    public DateTime Added      { get; set; }
    public DateTime? Modified   { get; set; } 
    public DateTime? Deleted    { get; set; } 
    public string UserId { get; set; }
    public ICollection<Budget> Budgets { get; set; } = new List<Budget>();
}