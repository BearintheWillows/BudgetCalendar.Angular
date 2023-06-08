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
        return await _context.Accounts.Where(c => c.UserId == _userId).Select(c => new AccountDto()
        {
            Id = c.Id,
            Name = c.Name,
            Balance = c.Balance,
            Modified = c.Modified
        }).ToListAsync();
    }

    public async Task<AccountDto?> GetById(int id)
    {
        var account = await _context.Accounts.Where(c => c.UserId == _userId).FirstOrDefaultAsync(c => c.Id == id);

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
        var account = await _context.Accounts.Where(c => c.UserId == _userId).FirstOrDefaultAsync(c => c.Id == id);

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
            Balance = account.Balance
        };
    }   

    public async Task<bool?> Delete(int id)
    {
        var account = await _context.Accounts.Where(c => c.UserId == _userId).FirstOrDefaultAsync(c => c.Id == id);

        if (account == null)
        {
            return null;
        }

        _context.Accounts.Remove(account);
        await _context.SaveChangesAsync();

        return true;
    }




}
