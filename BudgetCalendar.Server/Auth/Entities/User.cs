using Microsoft.AspNetCore.Identity;

namespace BudgetCalendar.Server.Auth.Entities;

public class User : IdentityUser

{
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime RefreshTokenExpiryTime { get; set; } = DateTime.Now;
}