using System.Transactions;
using BudgetCalendar.Server.Data.Enums;

namespace BudgetCalendar.Server.Data.Models;

using Interfaces;

public class Budget : IHasTimestamps
{
    public int       Id         { get; set; }
    public decimal   Amount     { get; set; } = 0;
    public DateTime  StartDate  { get; set; } = DateTime.Now;
    public DateTime? EndDate    { get; set; }
    public bool      IsArchived { get; set; } = false;
    public DateTime? Deleted    { get; set; }
    public DateTime? Modified   { get; set; }
    public DateTime  Added      { get; set; }
    public int       AccountId  { get; set; } = 0;
    public int       CategoryId { get; set; } = 0;
    public string UserId { get; set; }
    public TransactionType TransactionType { get; set; } = TransactionType.Expense;
    public Account Account { get; set; } = null!;
    public Category Category { get; set; } = null!;

    // public User User { get; set; } = null!;
}
