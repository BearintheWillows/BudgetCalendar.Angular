using BudgetCalendar.Server.Data.Enums;
using BudgetCalendar.Server.Data.Models;
using BudgetCalendar.Server.Data.Models.DTOs.BudgetDTOs;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BudgetCalendar.Server.Data.Services;

public interface IBudgetService
{
    Task<List<BudgetDTO>> GetAll();
    Task<BudgetDTO?> GetById(int id);
    Task<BudgetDTO?> Create(BudgetToCreateDTO budgetDto);
    Task<BudgetDTO?> Update(int id, BudgetToUpdateDTO budgetDto);
    Task<bool?> Delete(int id);

}

public class BudgetService : IBudgetService
{
    private readonly DataDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly string? _userId;

    public BudgetService( DataDbContext context, IHttpContextAccessor httpContextAccessor )
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;

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

    public async Task<BudgetDTO?> Create(BudgetToCreateDTO budgetDto)
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
}
