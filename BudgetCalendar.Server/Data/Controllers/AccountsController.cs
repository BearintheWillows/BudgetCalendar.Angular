using BudgetCalendar.Server.Data.Models.DTOs;
using BudgetCalendar.Server.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace BudgetCalendar.Server.Data.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountsController : ControllerBase
{
    private readonly IAccountsService _accountsService;
    public AccountsController(IAccountsService accountsService)
    {
        _accountsService = accountsService;
    }

    [HttpGet]
    public async Task<ActionResult<List<AccountDTO>>> Get()
    {
        return await _accountsService.GetAll();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AccountDTO>> GetById(int id)
    {
        var account = await _accountsService.GetById(id);

        if (account == null)
        {
            return NotFound();
        }

        return account;
    }

    [HttpPost]
    public async Task<ActionResult<AccountDTO>> Post(AccountDTO accountDTO)
    {
        var account = await _accountsService.Create(accountDTO);

        return CreatedAtAction(nameof(GetById), new { Id = account.Id }, account);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, AccountDTO accountDTO)
    {
        // if ( id != accountDTO.Id )
        // {
        // 	return BadRequest();
        // }

        var account = await _accountsService.Update(id, accountDTO);

        if (account == null)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var isDeleted = await _accountsService.Delete(id);

        if (isDeleted == false)
        {
            return NotFound();
        }

        return NoContent();
    }





}
