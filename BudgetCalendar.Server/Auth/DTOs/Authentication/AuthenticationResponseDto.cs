namespace BudgetCalendar.Server.Auth.DTOs.Authentication;
public class AuthenticationResponseDto
{
    public bool IsAuthSuccessful { get; set; }
    public string? ErrorMessage { get; set; }
    public string? Token { get; set; }
    public string? RefreshToken { get; set; }
    
    public string UserName { get; set; } = string.Empty;
}