namespace BudgetCalendar.Server.Auth.DTOs.Tokens;

public class RefreshTokenDto
{
    public string Token { get; set; }
    public string RefreshToken { get; set; }
}