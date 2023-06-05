namespace BudgetCalendar.Server.Data.Models.Configs;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class BudgetConfiguration : IEntityTypeConfiguration<Budget>
{
	public void Configure(EntityTypeBuilder<Budget> builder)
	{
		builder.ToTable("Budgets");
		builder.HasKey(x => x.Id);
		builder.Property(x => x.Amount).IsRequired().HasColumnType("decimal(18,2)");
		builder.Property( x => x.StartDate ).IsRequired();
		builder.Property(x => x.TransactionType).IsRequired();
		builder.Property(x => x.AccountId).IsRequired();
		builder.Property(x => x.CategoryId).IsRequired();
		builder.HasOne(x => x.Account).WithMany(x => x.Budgets).HasForeignKey(x => x.AccountId);
		builder.HasOne(x => x.Category).WithMany(x => x.Budgets).HasForeignKey(x => x.CategoryId);
		// builder.Property(x => x.UserId).IsRequired();
		// builder.HasOne(x => x.User).WithMany(x => x.Budgets).HasForeignKey(x => x.UserId);
	}
}