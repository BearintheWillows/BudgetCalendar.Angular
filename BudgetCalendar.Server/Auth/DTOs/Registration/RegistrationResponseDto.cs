namespace BudgetCalendar.Server.Auth.DTOs.Registration;

public class RegistrationResponseDto
{
    public bool IsSuccessful { get; set; }
    public IEnumerable<string>? Errors { get; set; }
}