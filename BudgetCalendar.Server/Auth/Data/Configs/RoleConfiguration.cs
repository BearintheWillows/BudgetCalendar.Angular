namespace BudgetCalendar.Server.Auth.Data.Configs;

using BudgetCalendar.Server.Auth.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.HasData(new Role { Name = "Admin", NormalizedName = "ADMIN" },
                         new Role { Name = "User", NormalizedName = "USER" }
        );
    }
}