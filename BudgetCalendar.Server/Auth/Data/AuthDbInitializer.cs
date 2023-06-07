using Microsoft.AspNetCore.Identity;
using BudgetCalendar.Server.Auth.Entities;

namespace BudgetCalendar.Server.Auth.Data;
public class AuthDbInitializer
{
    public static async Task SeedUsers(
        UserManager<User> userManager,
        RoleManager<Role> roleManager,
        IConfiguration configuration
    )
    {
        if (userManager.FindByNameAsync("SuperAdmin").Result == null)
        {
            User user = new User
            {
                UserName = "SuperAdmin",
                Email = configuration["FallBackAdmin:Email"],
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                PhoneNumber = "012345678",

            };

            IdentityResult result = await userManager.CreateAsync(user, configuration["FallBackAdmin:Password"]);


            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "Admin");
                await userManager.AddToRoleAsync(user, "User");
            }
        }
    }
}