namespace BudgetCalendar.Server.Data.Models.DTOs.BudgetDtos;

using System.Collections.ObjectModel;

public class DayDto
{
	public DateTime Date { get; set; }
    public Collection<BudgetDto> Budgets { get; set; } = new Collection<BudgetDto>();
}