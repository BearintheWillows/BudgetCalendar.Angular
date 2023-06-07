using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BudgetCalendar.Server.Data.Models.Configs;

public class RecurringBudgetSequenceConfiguration : IEntityTypeConfiguration<RecurringBudgetSequence>
{
    public void Configure( EntityTypeBuilder<RecurringBudgetSequence> builder )
    {
        builder.HasKey( x => x.Id );
        builder.Property( x => x.StartDate ).IsRequired();
        builder.Property( x => x.EndDate ).IsRequired();
        builder.Property( x => x.Interval ).IsRequired();
        builder.HasMany( x => x.Budgets ).WithOne( x => x.RecurringBudgetSequence ).HasForeignKey( x => x.RecurringBudgetSequenceId );
        
    }
}
