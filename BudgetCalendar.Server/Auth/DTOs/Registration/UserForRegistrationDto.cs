using System.ComponentModel.DataAnnotations;

namespace BudgetCalendar.Server.Auth.DTOs.Registration;
public class UserForRegistrationDto
{
    // Details of the user
    [Required(ErrorMessage = "First Name is required")]
    [MaxLength(50)]
    [RegularExpression(@"^[a-zA-Z ]+$", ErrorMessage = "Only letters and spaces allowed")]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Last Name is required")]
    [MaxLength(50)]
    [RegularExpression(@"^[a-zA-Z ]+$", ErrorMessage = "Only letters and spaces allowed")]
    public string LastName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid Email Address")]
    [DataType(DataType.EmailAddress)]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Phone Number is required")]
    [Phone(ErrorMessage = "Invalid Phone Number")]
    [DataType(DataType.PhoneNumber)]
    public string PhoneNumber { get; set; } = string.Empty;

    [Required(ErrorMessage = "Place of Work is required")]
    [MaxLength(50)]
    [RegularExpression(@"^[a-zA-Z0-9 ]+$", ErrorMessage = "Only letters, numbers and spaces allowed")]
    public string PlaceOfWork { get; set; } = string.Empty;

    [Required(ErrorMessage = "Role is required")]
    [MaxLength(50)]
    [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Only letters allowed. No Spaces")]
    public string Role { get; set; } = string.Empty;

    [Required(ErrorMessage = "Organisation name is required")]
    [MaxLength(50)]
    [RegularExpression(@"^[a-zA-Z0-9 ]+$", ErrorMessage = "Only letters, numbers and spaces allowed")]
    public string OrganizationName { get; set; } = string.Empty;

    // Details of the user's address
    [Required(ErrorMessage = "Sreet is required")]
    [MaxLength(50)]
    [RegularExpression(@"^[a-zA-Z0-9 ]+$", ErrorMessage = "Only letters, numbers and spaces allowed")]
    public string Street { get; set; } = string.Empty;

    [MaxLength(50)]
    [RegularExpression(@"^[a-zA-Z0-9 ]+$", ErrorMessage = "Only letters, numbers and spaces allowed")]
    public string? Street2 { get; set; }

    [Required(ErrorMessage = "City is required")]
    [MaxLength(50)]
    [RegularExpression(@"^[a-zA-Z ]+$", ErrorMessage = "Only letters and spaces allowed")]
    public string City { get; set; } = string.Empty;

    [Required(ErrorMessage = "County is required")]
    [MaxLength(50)]
    [RegularExpression(@"^[a-zA-Z ]+$", ErrorMessage = "Only letters and spaces allowed")]
    public string County { get; set; } = string.Empty;

    [Required(ErrorMessage = "Post Code is required")]
    [MaxLength(50)]
    [RegularExpression(@"^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$", ErrorMessage = "Incorrect PostCode Format")]
    public string PostCode { get; set; } = string.Empty;
}