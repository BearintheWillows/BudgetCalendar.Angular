namespace BudgetCalendar.Server.Data.Models.DTOs;

public abstract class AResponseDTO
{
    public bool isSuccess { get; set; } = false;
    public ICollection<string>? Errors { get; set; } = new List<string>();
}
