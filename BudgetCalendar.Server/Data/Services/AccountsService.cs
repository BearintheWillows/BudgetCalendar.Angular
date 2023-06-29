using BudgetCalendar.Server.Data.Models;
using BudgetCalendar.Server.Data.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BudgetCalendar.Server.Data.Services;

public interface IAccountsService
{
    Task<List<AccountDto>> GetAll();
    Task<AccountDto?> GetById(int id);
    Task<AccountDto?> Create(AccountDto accountDto);
    Task<AccountDto?> Update(int id, AccountDto accountDto);
    Task<bool?> Delete(int id);

    Task<bool?> UpdateAllBalances(ICollection<AccountDto> accountDtos);
}


public class AccountsService : IAccountsService
{
    private readonly DataDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly string? _userId;

    public AccountsService(DataDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;

        _userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
    }

    public async Task<List<AccountDto>> GetAll()
    {
        return await _context.Accounts.Where(dayOfWeek => dayOfWeek.UserId == _userId).Select(dayOfWeek => new AccountDto()
        {
            Id = dayOfWeek.Id,
            Name = dayOfWeek.Name,
            Balance = dayOfWeek.Balance,
            Modified = dayOfWeek.Modified
        }).ToListAsync();
    }

    public async Task<AccountDto?> GetById(int id)
    {
        var account = await _context.Accounts.Where(dayOfWeek => dayOfWeek.UserId == _userId).FirstOrDefaultAsync(dayOfWeek => dayOfWeek.Id == id);

        if (account == null)
        {
            return null;
        }

        return new AccountDto()
        {
            Id = account.Id,
            Name = account.Name,
            Balance = account.Balance
        };
    }   

    public async Task<AccountDto?> Create(AccountDto accountDto)
    {
        var account = new Account()
        {
            Name = accountDto.Name,
            Balance = ( decimal ) accountDto.Balance,
            UserId = _userId
        };

        _context.Accounts.Add(account);
        await _context.SaveChangesAsync();

        return new AccountDto()
        {
            Id = account.Id,
            Name = account.Name,
            Balance = account.Balance
        };
    }

    public async Task<AccountDto?> Update(int id, AccountDto accountDto)
    {
        var account = await _context.Accounts.Where(dayOfWeek => dayOfWeek.UserId == _userId).FirstOrDefaultAsync(dayOfWeek => dayOfWeek.Id == id);

        if (account == null)
        {
            return null;
        }

        if ( accountDto.Name != null)
        {
            account.Name = accountDto.Name;
        }

        if ( accountDto.Balance != null)
        {
            account.Balance = ( decimal ) accountDto.Balance;
        }

        await _context.SaveChangesAsync();

        return new AccountDto()
        {
            Id = account.Id,
            Name = account.Name,
            Balance = account.Balance,
            Modified = account.Modified,
        };
    }   

    public async Task<bool?> Delete(int id)
    {
        var account = await _context.Accounts.Where(dayOfWeek => dayOfWeek.UserId == _userId).FirstOrDefaultAsync(dayOfWeek => dayOfWeek.Id == id);

        if (account == null)
        {
            return null;
        }

        _context.Accounts.Remove(account);
        await _context.SaveChangesAsync();

        return true;
    }
    
    
    public async Task<bool?> UpdateAllBalances(ICollection<AccountDto> accountDtos)
    {
        foreach (var accountDto in accountDtos)
        {
            var account = await _context.Accounts.Where(account => account.UserId == _userId).FirstOrDefaultAsync(account =>  account.Id == accountDto.Id);

            if (account == null)
            {
                return null;
            }

            account.Balance = ( decimal ) accountDto.Balance;
        }

        await _context.SaveChangesAsync();

        return true;
    }




}
