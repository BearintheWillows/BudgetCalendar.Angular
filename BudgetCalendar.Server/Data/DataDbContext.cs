using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BudgetCalendar.Server.Data;

using System.Reflection;
using Models;
using Models.Configs;
using Models.Interfaces;

public class DataDbContext : DbContext
{
    public DataDbContext(DbContextOptions<DataDbContext> options) : base( options )
    {
        ChangeTracker.Tracked += UpdateTimestamps;
        ChangeTracker.StateChanged += UpdateTimestamps;
    }
    
    public DbSet<Budget> Budgets { get; set; } = null!;
    public DbSet<Account> Accounts { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        builder.ApplyConfiguration(new AccountConfiguration());
        builder.ApplyConfiguration(new CategoryConfiguration());
        builder.ApplyConfiguration(new BudgetConfiguration());
    }

    private static void UpdateTimestamps(object sender, EntityEntryEventArgs e)
    {
        if (e.Entry.Entity is IHasTimestamps entityWithTimestamps)
        {
            switch (e.Entry.State)
            {
            case EntityState.Deleted:
                entityWithTimestamps.Deleted = DateTime.UtcNow;
                Console.WriteLine($"Stamped for delete: {e.Entry.Entity}");
                break;
            case EntityState.Modified:
                entityWithTimestamps.Modified = DateTime.UtcNow;
                Console.WriteLine($"Stamped for update: {e.Entry.Entity}");
                break;
            case EntityState.Added:
                entityWithTimestamps.Added = DateTime.UtcNow;
                Console.WriteLine($"Stamped for insert: {e.Entry.Entity}");
                break;
            }
        }
    }
}