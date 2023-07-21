using BudgetCalendar.Server.Data.Enums;
using BudgetCalendar.Server.Data.Models;
using BudgetCalendar.Server.Data.Models.DTOs;
using BudgetCalendar.Server.Data.Models.DTOs.BudgetDtos;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BudgetCalendar.Server.Data.Services;

using System.Diagnostics;
using System.Runtime.InteropServices.JavaScript;

public interface IBudgetService
{
    Task<List<BudgetDto>> GetAll();
    Task<BudgetDto?>      GetById(int                              id);
    Task<bool>            CreateOneBudget(BudgetToCreateDto        budgetDto);
    Task<bool>            CreateRecurringBudget( BudgetToCreateDto budgetDto );
    Task<BudgetDto?>      Update(int                               id, BudgetToUpdateDto budgetDto);
    Task<bool?>           Delete(int                               id);
    Task<List<Budget>>    GetBudgetsByDates(DateTime?              startDate, DateTime? endDate);
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
        return await _context.Budgets.Include(dayOfWeek => dayOfWeek.Account).Include(dayOfWeek => dayOfWeek.Category).Where(dayOfWeek => dayOfWeek.UserId == _userId).Select(dayOfWeek => new BudgetDto()
        {
            Id = dayOfWeek.Id,
            Amount = dayOfWeek.Amount,
            Date = dayOfWeek.Date,
            TransactionType = dayOfWeek.TransactionType.ToString().ToLower(),
            Note = dayOfWeek.Note,
            Color = dayOfWeek.Color,
            Icon = dayOfWeek.Icon,
            Account = new AccountDto()
                {
                Name = dayOfWeek.Account.Name,
                },
            Category = new CategoryDto()
                {
                Name = dayOfWeek.Category.Name,
                },
            RecurringBudgetSequence = new RecurringBudgetSequenceDto()
                {
                    Id = dayOfWeek.RecurringBudgetSequence.Id,
                    StartDate = dayOfWeek.RecurringBudgetSequence.StartDate,
                    EndDate = dayOfWeek.RecurringBudgetSequence.EndDate ,
                    Interval = dayOfWeek.RecurringBudgetSequence.Interval.ToString().ToLower()
                },
        }).ToListAsync();
    }

    

    public async Task<BudgetDto?> GetById(int id)
    {
        var budget = await _context.Budgets.Where(dayOfWeek => dayOfWeek.UserId == _userId).FirstOrDefaultAsync(dayOfWeek => dayOfWeek.Id == id);

        if (budget == null)
        {
            return null;
        }

        return new BudgetDto()
        {
            Id = budget.Id,
            Amount = budget.Amount,
            
    
            TransactionType = budget.TransactionType.ToString().ToLower()
            //TODO: Add the rest of the properties
        };
    }

    public async Task<bool> CreateOneBudget(BudgetToCreateDto budgetDto)
    {

        if ( !Enum.TryParse<TransactionType>( budgetDto.TransactionType, out var transactionType ))
        {
            Console.WriteLine("Could not parse TransactionType");
            return false;
        }
        
        Console.WriteLine("$userid: {_userid}");
 Console.WriteLine($"note: {budgetDto.Note}");
        if ( _userId != null )
        {
            
            
            var budget = new Budget()
                {
                Amount = budgetDto.Amount,
                Date = budgetDto.Date ,
                TransactionType = transactionType,
                AccountId = budgetDto.AccountId,
                CategoryId = budgetDto.CategoryId,
                Color = budgetDto.Color ?? string.Empty,
                UserId = _userId,
                RecurringBudgetSequence = null,
                RecurringBudgetSequenceId = null,
                Note = budgetDto.Note ?? string.Empty,
                
                };
            
           
            _context.Budgets.Add(budget);
            await _context.SaveChangesAsync();

            return true;
        }
        
        return false;
    }

    public async Task<bool> CreateRecurringBudget(BudgetToCreateDto budgetDto)
    {
        List<Budget> budgets = new List<Budget>();
        
        Console.WriteLine($"BudgetDto: {budgetDto.RecurringBudgetSequence.StartDate}");


        if ( !Enum.TryParse<TransactionType>( budgetDto.TransactionType, out var transactionType ) )
        {
            return false;
        }
        
        
        var recurringBudgetSequence = new RecurringBudgetSequence(budgetDto.RecurringBudgetSequence!.StartDate, budgetDto.RecurringBudgetSequence.EndDate, Enum.Parse<RecurringBudgetInterval>(budgetDto.RecurringBudgetSequence.Interval, true));

        var rbs = _context.RecurringBudgetSequences.Add(recurringBudgetSequence).Entity;
        
        _context.SaveChanges();

        foreach (var item in this.GetDatesInRange(budgetDto.RecurringBudgetSequence.StartDate, null, Enum.Parse<RecurringBudgetInterval>(budgetDto.RecurringBudgetSequence.Interval, true)))
        {
            var budget = new Budget()
            {
                Amount = budgetDto.Amount,
                Date = item,
                Note = budgetDto.Note ?? null,
                Color = budgetDto.Color ?? null,
                AccountId = budgetDto.AccountId,
                CategoryId = budgetDto.CategoryId,
                TransactionType = transactionType,
                RecurringBudgetSequenceId = rbs.Id,
                UserId = _userId
            };
            budgets.Add( budget );
        };



        Console.WriteLine( $"Budgets = {budgets.Count()}" );

        _context.Budgets.AddRange( budgets );

        Console.WriteLine(_context.Budgets.CountAsync().Result);
        _context.SaveChanges();

        
        //TODO FIX RETURN DTO
        return true;
    }

    public async Task<BudgetDto?> Update(int id, BudgetToUpdateDto budgetToUpdateDto)
    {
        if ( !Enum.TryParse<TransactionType>( budgetToUpdateDto.TransactionType, out var transactionType ) )
        {
            return null;
        }

        var budget = await _context.Budgets.Where(dayOfWeek => dayOfWeek.UserId == _userId).FirstOrDefaultAsync(dayOfWeek => dayOfWeek.Id == id);

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
 
            TransactionType = budget.TransactionType.ToString().ToLower()
        };
    }

    public async Task<bool?> Delete(int id)
    {
        var budget = await _context.Budgets.Where(dayOfWeek => dayOfWeek.UserId == _userId).FirstOrDefaultAsync(dayOfWeek => dayOfWeek.Id == id);

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
    
    public async Task<List<Budget>> GetBudgetsByDates(DateTime? startDate, DateTime? endDate)
    {
        var budgets = await _context.Budgets.Include(b => b.Account).Include(b => b.Category).Include(b => b.RecurringBudgetSequence).Where(b => b.UserId == _userId && b.Date >= startDate && b.Date <= endDate).ToListAsync();
        if (budgets == null)
        {
            return null;
        }
        
        return budgets;
    }
    
   
    
    
}
