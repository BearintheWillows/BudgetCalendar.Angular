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
	
	

}