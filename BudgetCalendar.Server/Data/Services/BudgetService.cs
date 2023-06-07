using BudgetCalendar.Server.Data.Enums;
using BudgetCalendar.Server.Data.Models;
using BudgetCalendar.Server.Data.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BudgetCalendar.Server.Data.Services;

public interface IBudgetService
{
    Task<List<BudgetDto>> GetAll();
    Task<BudgetDto?> GetById(int id);
    Task<BudgetDto?> CreateOneBudget(BudgetToCreateDto budgetDto);
    Task<BudgetDto?> CreateRecurringBudget( BudgetToCreateDto budgetDto );
    Task<BudgetDto?> Update(int id, BudgetToUpdateDto budgetDto);
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

    public async Task<List<BudgetDto>> GetAll()
    {
        return await _context.Budgets.Where(c => c.UserId == _userId).Select(c => new BudgetDto()
        {
            Id = c.Id,
            Amount = c.Amount,
    
            Modified = (DateTime)c.Modified,
            TransactionType = c.TransactionType.ToString().ToLower()
            //TODO: Add the rest of the properties
        }).ToListAsync();
    }

    

    public async Task<BudgetDto?> GetById(int id)
    {
        var budget = await _context.Budgets.Where(c => c.UserId == _userId).FirstOrDefaultAsync(c => c.Id == id);

        if (budget == null)
        {
            return null;
        }

        return new BudgetDto()
        {
            Id = budget.Id,
            Amount = budget.Amount,
            
            Modified = (DateTime)budget.Modified,
            TransactionType = budget.TransactionType.ToString().ToLower()
            //TODO: Add the rest of the properties
        };
    }

    public async Task<BudgetDto?> CreateOneBudget(BudgetToCreateDto budgetDto)
    {

        if ( !Enum.TryParse<TransactionType>( budgetDto.TransactionType, out var transactionType ))
        {
            return null;
        }
        var budget = new Budget()
        {
            Amount = budgetDto.Amount,
        TransactionType = transactionType,
            AccountId = budgetDto.AccountId,
            CategoryId = budgetDto.CategoryId,
            UserId = _userId
//TODO: Add the rest of the properties
        };

        _context.Budgets.Add(budget);
        await _context.SaveChangesAsync();

        return new BudgetDto()
        {
            Id = budget.Id,
            Amount = budget.Amount,
      
            TransactionType = budget.TransactionType.ToString().ToLower()
        //TODO: Add the rest of the properties
        };
    }

    public async Task<BudgetDto?> CreateRecurringBudget(BudgetToCreateDto budgetDto)
    {
        List<Budget> budgets = new List<Budget>();


        if ( !Enum.TryParse<TransactionType>( budgetDto.TransactionType, out var transactionType ) )
        {
            return null;
        }

        //parse budgetDto.ReccuringInterval
        RecurringBudgetInterval interval = (RecurringBudgetInterval)Enum.Parse(typeof(RecurringBudgetInterval), budgetDto.ReccuringInterval!);

        foreach (var item in this.GetDatesInRange(budgetDto.StartDate, null, interval))
        {
            var budget = new Budget()
            {
                Amount = budgetDto.Amount,
            
                TransactionType = transactionType,
                AccountId = budgetDto.AccountId,
                CategoryId = budgetDto.CategoryId,
            //TODO: Add the rest of the properties
            UserId = _userId
            };
           
            budgets.Add( budget );
        };



        Console.WriteLine( $"Budgets = {budgets.Count()}" );

        _context.Budgets.AddRange( budgets );

        Console.WriteLine(_context.Budgets.CountAsync().Result);
        _context.SaveChanges();

        

        return new BudgetDto()
        {
            Id = 1,
            Amount = budgetDto.Amount,
            StartDate = budgetDto.StartDate,
            EndDate = budgetDto.EndDate,
            TransactionType = budgetDto.TransactionType.ToString().ToLower(),
            Modified = null
        };
    }

    public async Task<BudgetDto?> Update(int id, BudgetToUpdateDto budgetToUpdateDto)
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
//TODO: Add the rest of the properties
        budget.TransactionType = transactionType;
        

        await _context.SaveChangesAsync();

        return new BudgetDto()
        {
            Id = budget.Id,
            Amount = budget.Amount,
     //TODO: Add the rest of the properties
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
    private List<DateTime> GetDatesInRange(DateTime startDate, DateTime? endDate, RecurringBudgetInterval interval)
    {

        var dates = new List<DateTime>();
        if (endDate == null)
        {
            endDate = startDate.AddYears( 10 );
        }

        //new datetime 10 years from startime


        for (var dt = startDate; dt <= endDate; dt = dt.AddDays(this.GetInterval(interval)))
        {
            dates.Add(dt);
        }

        return dates;
    }

    //get intervals for daily, weekly, bi-weekly, monthly and yearly
    private int GetInterval(RecurringBudgetInterval reccuringInterval)
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
