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
		
		
		context.SaveChanges();

		if ( !context.Accounts.Any() )
		{
			
			context.Accounts.AddRange( GenerateAccounts() );
		}
		
		
		context.SaveChanges();
		
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
			new Category {Name = "Food" },
			new Category {Name = "Rent" },
			new Category {Name = "Utilities" },
			new Category {Name = "Entertainment" },
			new Category {Name = "Transportation" },
			new Category {Name = "Clothing" },
			new Category {Name = "Medical" },
			new Category {Name = "Insurance" },
			new Category {Name = "Personal" },
			new Category {Name = "Debt" },
			new Category {Name = "Education" },
			new Category {Name = "Savings" },
			new Category {Name = "Gifts" },
			new Category {Name = "Other" }
			};
	}

	public static IEnumerable<Account> GenerateAccounts()
	{
		return new List<Account>
			{
			new() { Name = "FlexPlus", Balance = 0, IsArchived = false, Added = DateTime.Now},
			new() { Name = "Monzo", Balance = 0, IsArchived = false, Added = DateTime.Now},
			};
	}
	
	public static IEnumerable<Budget> GenerateBudgets()
	{
		return new List<Budget>
			{
			new()
				{
				Amount = 20,
				StartDate = new DateTime( 2023, 06, 05 ),
				EndDate = null,
				IsArchived = false,
				Deleted = null,
				Modified = null,
				Added = DateTime.Now,
				AccountId = 3,
				CategoryId = 15,
				TransactionType = TransactionType.Expense
				},
			new()
				{
				Amount = 23,
				StartDate = new DateTime( 2023, 06, 03 ),
				EndDate = null,
				IsArchived = false,
				Deleted = null,
				Modified = null,
				Added = DateTime.Now,
				AccountId = 3,
				CategoryId = 16,
				TransactionType = TransactionType.Expense
				},
			new()
				{
				Amount = 30,
				StartDate = new DateTime( 2023, 06, 20 ),
				EndDate = null,
				IsArchived = false,
				Deleted = null,
				Modified = null,
				Added = DateTime.Now,
				AccountId = 3,
				CategoryId = 17,
				TransactionType = TransactionType.Expense
				},
			new()
				{
				Amount = 21,
				StartDate = new DateTime( 2023, 06, 20 ),
				EndDate = null,
				IsArchived = false,
				Deleted = null,
				Modified = null,
				Added = DateTime.Now,
				AccountId = 3,
				CategoryId = 18,
				TransactionType = TransactionType.Expense
				},
			new()
				{
				Amount = 200,
				StartDate = new DateTime( 2023, 06, 13 ),
				EndDate = null,
				IsArchived = false,
				Deleted = null,
				Modified = null,
				Added = DateTime.Now,
				AccountId = 3,
				CategoryId = 19,
				TransactionType = TransactionType.Expense
				},
			new()
				{
				Amount = 20,
				StartDate = new DateTime( 2023, 06, 16 ),
				EndDate = null,
				IsArchived = false,
				Deleted = null,
				Modified = null,
				Added = DateTime.Now,
				AccountId = 3,
				CategoryId = 19,
				TransactionType = TransactionType.Expense
				},
			};
	}

}