using BudgetCalendar.Server.Data.Enums;

namespace BudgetCalendar.Server.Data.Models;

public class RecurringBudgetSequence
{
    public int       Id        { get; set; }
    public DateTime  StartDate { get; set; } 
    public DateTime? EndDate   { get; set; } 

    public RecurringBudgetInterval Interval { get; set; } 

    public List<Budget> Budgets { get; set; } = new List<Budget>();


    public RecurringBudgetSequence( DateTime startDate, DateTime? endDate, RecurringBudgetInterval interval )
    {
        StartDate = startDate;
        
        if (endDate == null)
        {
            EndDate = startDate.AddYears(10);
        } else
        {
            EndDate = (DateTime)endDate;
        }
        Interval = interval;
    }
}
