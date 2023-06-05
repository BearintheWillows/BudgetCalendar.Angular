namespace BudgetCalendar.Server.Data.Models.Configs;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


public class AccountConfiguration : IEntityTypeConfiguration<Account>
{
    public void Configure(EntityTypeBuilder<Account> builder)
    {
        builder.ToTable("Accounts");
        builder.HasKey( x => x.Id );
        builder.Property(x => x.Name).IsRequired();
        builder.Property( x => x.Balance ).IsRequired().HasColumnType("decimal(18,2)");

        //compute Created as now

        // builder.Property(x => x.UserId).IsRequired();
        // builder.HasOne(x => x.User).WithMany(x => x.Accounts).HasForeignKey(x => x.UserId);
    }

    private static DateTime GetDate() => DateTime.Now;
}