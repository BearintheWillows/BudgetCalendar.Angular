using System.ComponentModel.DataAnnotations;

namespace BudgetCalendar.Server.Auth.DTOs.Registration;
public class UserForRegistrationDto
{

    public string Email { get; set; } = string.Empty;

    public string Password {get; set;} = string.Empty;

    public string ConfirmPassword {get; set;} = string.Empty;
}