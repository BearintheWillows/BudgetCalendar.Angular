namespace BudgetCalendar.Server.Data.Models.DTOs;

public class RecurringBudgetSequenceDto
{
	
	public int Id { get; set; }
	public DateTime StartDate { get; set; }
	
	public DateTime? EndDate { get; set; }
	
	public string Interval { get; set; }
}