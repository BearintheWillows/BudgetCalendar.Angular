using BudgetCalendar.Server.Data.Models.DTOs;
using BudgetCalendar.Server.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace BudgetCalendar.Server.Data.Controllers;

using Microsoft.AspNetCore.Authorization;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly IAccountsService _accountsService;
    public AccountController(IAccountsService accountsService)
    {
        _accountsService = accountsService;
    }

    [HttpGet]
    public async Task<ActionResult<List<AccountDto>>> Get()
    {
        return await _accountsService.GetAll();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AccountDto>> GetById(int id)
    {
        var account = await _accountsService.GetById(id);

        if (account == null)
        {
            return NotFound(new HttpResponseDto<object>(false, "Account not found") );
        }

        return account;
    }
    
    [HttpPut( "reconcile" )]
    public async Task<IActionResult> PatchAll(ICollection<AccountDto> accounts)
    {
        var isUpdated = await _accountsService.UpdateAllBalances(accounts);

        if (isUpdated == false)
        {
            return NotFound(new HttpResponseDto<object>(false, "Account not found") );
        }

        return Ok(new HttpResponseDto<object?>(true, "Account Successfully Updated" ));
    }

    [HttpPost]
    public async Task<ActionResult<AccountDto>> Post(AccountDto accountDto)
    {
        var account = await _accountsService.Create(accountDto);

        return CreatedAtAction(nameof(GetById), new { Id = account.Id }, new HttpResponseDto<AccountDto>(true, account, "Account Successfully Created" ));
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<AccountDto>> Patch(int id, AccountDto accountDto)
    {

        var account = await _accountsService.Update(id, accountDto);

        if (account == null)
        {
            return NotFound(new HttpResponseDto<object>(false, "Account not found") );
        }

        return Ok(new HttpResponseDto<AccountDto>(true, account, "Account Successfully Updated" ));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var isDeleted = await _accountsService.Delete(id);

        if (isDeleted == false)
        {
            return NotFound(new HttpResponseDto<object>(false, "Account not found") );
        }

        return Ok(new HttpResponseDto<object?>(true, "Account Successfully Deleted" ));
    }





}
