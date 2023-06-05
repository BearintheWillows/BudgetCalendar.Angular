namespace BudgetCalendar.Server.Data.Models.Configs;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
	
	public void Configure(EntityTypeBuilder<Category> builder)
	{
		builder.ToTable("Categories");
		builder.HasKey(x => x.Id);
		builder.Property(x => x.Name).IsRequired();
		// builder.Property(x => x.UserId).IsRequired();
		// builder.HasOne(x => x.User).WithMany(x => x.Categories).HasForeignKey(x => x.UserId);
	}
}