namespace BudgetCalendar.Server.Data.Models.DTOs.BudgetDtos;

public class BudgetToUpdateDto : BudgetToCreateDto
{
    public int Id { get; set; }
    public bool RemoveFromSequence { get; set; }
}
