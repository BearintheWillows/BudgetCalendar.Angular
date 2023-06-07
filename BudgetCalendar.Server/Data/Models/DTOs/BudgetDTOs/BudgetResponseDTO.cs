namespace BudgetCalendar.Server.Data.Models.DTOs.BudgetDTOs;

public class BudgetResponseDTO<T> : AResponseDTO where T : class
{
    public T? Budget { get; set; }
}
