namespace BudgetCalendar.Server.Data.Models.DTOs.BudgetDtos;

public class BudgetDto
{
	public int Id { get; set; }

	public decimal Amount { get; set; }

	public DateTime Date { get; set; } = DateTime.Now;

	public bool IsArchived { get; set; }

	public string? Note { get; set; } = string.Empty;

	public string? Color { get; set; } = string.Empty;

	public byte[]? Icon { get; set; } = Array.Empty<byte>();

	public string TransactionType { get; set; } = string.Empty;


	public AccountDto? Account { get; set; }

	public CategoryDto? Category { get; set; }

	public RecurringBudgetSequenceDto? RecurringBudgetSequence { get; set; }

	public static BudgetDto ConvertTo(Budget budget)
	{
		return new BudgetDto
			{
			Id = budget.Id,
			Amount = budget.Amount,
			Date = budget.Date,
			TransactionType = budget.TransactionType.ToString().ToLower(),
			Note = budget.Note,
			Color = budget.Color,
			Icon = budget.Icon,
			Account = new AccountDto { Name = budget.Account.Name, Id = budget.CategoryId} ,
			Category = new CategoryDto { Name = budget.Category.Name, Id = budget.CategoryId},
			RecurringBudgetSequence = new RecurringBudgetSequenceDto
				{
				Id = budget.RecurringBudgetSequence.Id,
				StartDate = budget.RecurringBudgetSequence.StartDate,
				EndDate = budget.RecurringBudgetSequence.EndDate,
				Interval = budget.RecurringBudgetSequence.Interval.ToString().ToLower()
				},
			};
	}
}