namespace BudgetCalendar.Server.Data.Models.DTOs;


public class HttpResponseDTO<T> where T : class
{
    public bool isSuccess { get; set; } = false;
    public T? Data { get; set; }
    public ICollection<string>? Errors { get; set; } = new List<string>();

}
