namespace BudgetCalendar.Server.Data;

using Enums;
using Microsoft.EntityFrameworkCore;
using Models;

public static class DataDbInitializer
{
	public static void Initialize(DataDbContext context)
	{
		if ( !context.Categories.Any() )
		{
			context.Categories.AddRange( GeneratCategories() );
		}

		if ( !context.Accounts.Any() )
		{

			context.Accounts.AddRange( GenerateAccounts() );
		}

		if ( ! context.RecurringBudgetSequences.Any() )
		{
			context.RecurringBudgetSequences.AddRange( GenerateRBS() );
		}

		if ( !context.Budgets.Any() )
		{
			context.Budgets.AddRange( GenerateBudgets() );
		}

		context.SaveChanges();
	}

	public static IEnumerable<Category> GeneratCategories()
	{
		return new List<Category>
			{
			new Category { Name = "Food", UserId = $"67dc3800-b214-4eeb-aa21-a3b4526deee1" },
			new Category { Name = "Rent", UserId = "67dc3800-b214-4eeb-aa21-a3b4526deee1" },
			};
	}

	public static IEnumerable<Account> GenerateAccounts()
	{
		return new List<Account>
			{
			new()
				{
				Name = "FlexPlus",
				Balance = 0,
				IsArchived = false,
				Added = DateTime.Now,
				UserId = "67dc3800-b214-4eeb-aa21-a3b4526deee1"
				},
			new()
				{
				Name = "Monzo",
				Balance = 0,
				IsArchived = false,
				Added = DateTime.Now,
				UserId = "67dc3800-b214-4eeb-aa21-a3b4526deee1"
				},
			};
	}

	public static IEnumerable<RecurringBudgetSequence> GenerateRBS()
	{
		return new List<RecurringBudgetSequence>()
			{
			new(new DateTime( 2023, 06, 23 ), null, RecurringBudgetInterval.Monthly),
			
			};
	}

	public static IEnumerable<Budget> GenerateBudgets()
	{
		return new List<Budget>()
			{
			new()
				{
				Amount = 0,
				Date = new DateTime( 2023, 06, 23 ),
				IsArchived = false,
				TransactionType = TransactionType.Income,
				Note = "Test",
				Color = "Test",
				AccountId = 1,
				CategoryId = 3,
				RecurringBudgetSequenceId = 2,
				UserId = "67dc3800-b214-4eeb-aa21-a3b4526deee1"
				},
			new()
				{
				Amount = 100,
				Date = new DateTime( 2023 / 06 / 15 ),
				IsArchived = false,
				TransactionType = TransactionType.Expense,
				Note = "Test",
				Color = "Test",
				AccountId = 1,
				CategoryId = 4,
				RecurringBudgetSequenceId = 2,
				UserId = "67dc3800-b214-4eeb-aa21-a3b4526deee1"
				},
			new()
				{
				Amount = 100,
				Date = new DateTime( 2023 / 06 / 02 ),
				IsArchived = false,
				TransactionType = TransactionType.Income,
				Note = "Test",
				Color = "Test",
				AccountId = 1,
				CategoryId = 3,
				RecurringBudgetSequenceId = 2,
				UserId = "67dc3800-b214-4eeb-aa21-a3b4526deee1"
				},
			new()
				{
				Amount = 300,
				Date = new DateTime( 2023 / 06 / 02 ),
				IsArchived = false,
				TransactionType = TransactionType.Expense,
				Note = "Test",
				Color = "Test",
				AccountId = 2,
				CategoryId = 4,
				RecurringBudgetSequenceId = 2,
				UserId = "67dc3800-b214-4eeb-aa21-a3b4526deee1"
				},
			};


	}
}