using System.ComponentModel.DataAnnotations;

namespace BudgetCalendar.Server.Auth.DTOs.Registration;
public class UserForRegistrationDto
{
    [Required(ErrorMessage = "Email is required.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required.")]
    public string Password {get; set;} = string.Empty;

    [Compare("Password", ErrorMessage = "Passwords do not match.")]
    public string ConfirmPassword {get; set;} = string.Empty;
}