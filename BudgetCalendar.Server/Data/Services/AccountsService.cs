using BudgetCalendar.Server.Data.Models;
using BudgetCalendar.Server.Data.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BudgetCalendar.Server.Data.Services;

public interface IAccountsService
{
    Task<List<AccountDTO>> GetAll();
    Task<AccountDTO?> GetById(int id);
    Task<AccountDTO?> Create(AccountDTO accountDto);
    Task<AccountDTO?> Update(int id, AccountDTO accountDto);
    Task<bool?> Delete(int id);

}

[Authorize]
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

    public async Task<List<AccountDTO>> GetAll()
    {
        return await _context.Accounts.Where(c => c.UserId == _userId).Select(c => new AccountDTO()
        {
            Id = c.Id,
            Name = c.Name,
            Balance = c.Balance
        }).ToListAsync();
    }

    public async Task<AccountDTO?> GetById(int id)
    {
        var account = await _context.Accounts.Where(c => c.UserId == _userId).FirstOrDefaultAsync(c => c.Id == id);

        if (account == null)
        {
            return null;
        }

        return new AccountDTO()
        {
            Id = account.Id,
            Name = account.Name,
            Balance = account.Balance
        };
    }   

    public async Task<AccountDTO?> Create(AccountDTO accountDto)
    {
        var account = new Account()
        {
            Name = accountDto.Name,
            Balance = accountDto.Balance,
            UserId = _userId
        };

        _context.Accounts.Add(account);
        await _context.SaveChangesAsync();

        return new AccountDTO()
        {
            Id = account.Id,
            Name = account.Name,
            Balance = account.Balance
        };
    }

    public async Task<AccountDTO?> Update(int id, AccountDTO accountDto)
    {
        var account = await _context.Accounts.Where(c => c.UserId == _userId).FirstOrDefaultAsync(c => c.Id == id);

        if (account == null)
        {
            return null;
        }

        account.Name = accountDto.Name;
        account.Balance = accountDto.Balance;

        await _context.SaveChangesAsync();

        return new AccountDTO()
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
