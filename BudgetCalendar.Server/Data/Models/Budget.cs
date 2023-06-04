using System.Transactions;
using BudgetCalendar.Server.Data.Enums;

namespace BudgetCalendar.Server.Data.Models;

public class Budget 
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public TransactionType TransactionType { get; set; }

    public Recurring bool { get; set; }

    public RecurringInterval RecurringInterval { get; set; }

    public decimal Amount { get; set; }

    public int UserId { get; set; }


}
