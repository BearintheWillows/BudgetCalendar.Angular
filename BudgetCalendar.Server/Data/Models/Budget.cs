using System.Transactions;
using BudgetCalendar.Server.Data.Enums;

namespace BudgetCalendar.Server.Data.Models;

using Interfaces;

public class Budget : IHasTimestamps
{
    public int Id { get; set; }
    public decimal   Amount     { get; set; } = 0;
    public DateTime Date { get; set; } = DateTime.Now;
    public bool      IsArchived { get; set; } = false;
    public DateTime? Deleted    { get; set; }
    public DateTime? Modified   { get; set; }
    public DateTime  Added      { get; set; }
    public string Note { get; set; } = string.Empty;

    public string Color = string.Empty;

    public byte[] Icon { get; set; } = new byte[0];

    // Relationships
    public int       AccountId  { get; set; } = 0;
    public int       CategoryId { get; set; } = 0;
    public int RecurringBudgetSequenceId { get; set; } = 0;
    public TransactionType TransactionType { get; set; } = TransactionType.Expense;
    public Account Account { get; set; } = null!;
    public Category Category { get; set; } = null!;
    public RecurringBudgetSequence RecurringBudgetSequence { get; set; } = null!;

    public string UserId { get; set; } = string.Empty;

}
