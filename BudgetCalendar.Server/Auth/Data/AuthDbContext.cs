
using System.Reflection;
using BudgetCalendar.Server.Auth.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BudgetCalendar.Server.Auth.Data;
public class AuthDbContext : IdentityDbContext<User>
{
    public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
    { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}