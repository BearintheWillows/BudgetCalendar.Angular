using BudgetCalendar.Server.Data.Enums;
using BudgetCalendar.Server.Data.Models;
using BudgetCalendar.Server.Data.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BudgetCalendar.Server.Data.Services;

public interface IBudgetService
{
    Task<List<BudgetDTO>> GetAll();
    Task<BudgetDTO?> GetById(int id);
    Task<BudgetDTO?> CreateOneBudget(BudgetToCreateDTO budgetDto);
    Task<BudgetDTO?> Update(int id, BudgetToUpdateDTO budgetDto);
    Task<bool?> Delete(int id);

}

public class BudgetService : IBudgetService
{
    private readonly IAccountsService _accountsService;
    private readonly DataDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly string? _userId;

    public BudgetService( DataDbContext context, IHttpContextAccessor httpContextAccessor, IAccountsService accountsService )
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
        _accountsService = accountsService;

        _userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
    }

    public async Task<List<BudgetDTO>> GetAll()
    {
        return await _context.Budgets.Where(c => c.UserId == _userId).Select(c => new BudgetDTO()
        {
            Id = c.Id,
            Amount = c.Amount,
            StartDate = c.StartDate,
            EndDate = c.EndDate,
            Modified = (DateTime)c.Modified,
            TransactionType = c.TransactionType.ToString().ToLower()
            
        }).ToListAsync();
    }

    

    public async Task<BudgetDTO?> GetById(int id)
    {
        var budget = await _context.Budgets.Where(c => c.UserId == _userId).FirstOrDefaultAsync(c => c.Id == id);

        if (budget == null)
        {
            return null;
        }

        return new BudgetDTO()
        {
            Id = budget.Id,
            Amount = budget.Amount,
            StartDate = budget.StartDate,
            EndDate = budget.EndDate,
            Modified = (DateTime)budget.Modified,
            TransactionType = budget.TransactionType.ToString().ToLower()
        };
    }

    public async Task<BudgetDTO?> CreateOneBudget(BudgetToCreateDTO budgetDto)
    {

        if ( !Enum.TryParse<TransactionType>( budgetDto.TransactionType, out var transactionType ))
        {
            return null;
        }
        var budget = new Budget()
        {
            Amount = budgetDto.Amount,
            StartDate = budgetDto.StartDate,
            EndDate = budgetDto.EndDate,
            TransactionType = transactionType,
            AccountId = budgetDto.AccountId,
            CategoryId = budgetDto.CategoryId,
            UserId = _userId

        };

        _context.Budgets.Add(budget);
        await _context.SaveChangesAsync();

        return new BudgetDTO()
        {
            Id = budget.Id,
            Amount = budget.Amount,
            StartDate = budget.StartDate,
            EndDate = budget.EndDate,
            TransactionType = budget.TransactionType.ToString().ToLower()
        };
    }

    public async Task<bool> CreateRecurringBudget(BudgetToCreateDTO budgetDto)
    {
        List<Budget> budgets = new List<Budget>();

        if (account == null)
        {
            return false;
        }

        if ( !Enum.TryParse<TransactionType>( budgetDto.TransactionType, out var transactionType ) )
        {
            return false;
        }

        var budget = new Budget()
        {
            Amount = budgetDto.Amount,
            EndDate = null,
            TransactionType = transactionType,
            AccountId = budgetDto.AccountId,
            CategoryId = budgetDto.CategoryId,
            UserId = _userId
        };

        foreach (var item in this.GetDatesInRange(budgetDto.StartDate, null, RecurringInterval.Yearly))
        {
            budget.StartDate = item;
            budgets.Add( budget );
        };





        await _context.Budgets.AddRangeAsync(budgets);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<BudgetDTO?> Update(int id, BudgetToUpdateDTO budgetToUpdateDto)
    {
        if ( !Enum.TryParse<TransactionType>( budgetToUpdateDto.TransactionType, out var transactionType ) )
        {
            return null;
        }

        var budget = await _context.Budgets.Where(c => c.UserId == _userId).FirstOrDefaultAsync(c => c.Id == id);

        if (budget == null)
        {
            return null;
        }

        budget.Amount = budgetToUpdateDto.Amount;
        budget.StartDate = budgetToUpdateDto.StartDate;
        budget.EndDate = budgetToUpdateDto.EndDate;
        budget.TransactionType = transactionType;
        

        await _context.SaveChangesAsync();

        return new BudgetDTO()
        {
            Id = budget.Id,
            Amount = budget.Amount,
            StartDate = budget.StartDate,
            EndDate = budget.EndDate,
            Modified = (DateTime)budget.Modified,
            TransactionType = budget.TransactionType.ToString().ToLower()
        };
    }

    public async Task<bool?> Delete(int id)
    {
        var budget = await _context.Budgets.Where(c => c.UserId == _userId).FirstOrDefaultAsync(c => c.Id == id);

        if (budget == null)
        {
            return null;
        }

        _context.Budgets.Remove(budget);
        await _context.SaveChangesAsync();

        return true;
    }

    //get all dates within date range at a specific interval
    private List<DateTime> GetDatesInRange(DateTime startDate, DateTime? endDate, RecurringInterval interval)
    {
        var dates = new List<DateTime>();
        if (endDate == null)
        {
            endDate = new DateTime( startDate.Year + 10 );
        }

        for (var dt = startDate; dt <= endDate; dt = dt.AddDays(this.GetInterval(interval)))
        {
            dates.Add(dt);
        }

        return dates;
    }

    //get intervals for daily, weekly, bi-weekly, monthly and yearly
    private int GetInterval(RecurringInterval reccuringInterval)
    {
        var intervalInDays = 0;

        switch (reccuringInterval.ToString().ToLower())
        {
            case "daily":
                intervalInDays = 1;
                break;
            case "weekly":
                intervalInDays = 7;
                break;
            case "bi-weekly":
                intervalInDays = 14;
                break;
            case "monthly":
                intervalInDays = 30;
                break;
            case "yearly":
                intervalInDays = 365;
                break;
        }

        return intervalInDays;
    }
}
