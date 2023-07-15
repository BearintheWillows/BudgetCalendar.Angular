namespace BudgetCalendar.Server.Data.Models.DTOs;

using BudgetDtos;

public class RecurringBudgetSequenceDto
{
	
	public int Id { get; set; }
	public DateTime StartDate { get; set; }
	
	public DateTime? EndDate { get; set; }
	
	public string Interval { get; set; }
	
	public ICollection<BudgetDto> Budgets { get; set; } = new List<BudgetDto>();
}