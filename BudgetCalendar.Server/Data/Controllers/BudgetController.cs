using BudgetCalendar.Server.Data.Models.DTOs;
using BudgetCalendar.Server.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetCalendar.Server.Data.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BudgetController : ControllerBase
{
    private readonly IBudgetService _budgetService;

    public BudgetController(IBudgetService budgetService)
    {
        _budgetService = budgetService;
    }

    [HttpGet]
    public async Task<ActionResult<List<BudgetDto>>> Get()
    {
        return await _budgetService.GetAll();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BudgetDto>> GetById(int id)
    {
        var budget = await _budgetService.GetById(id);

        if (budget == null)
        {
            return NotFound(new HttpResponseDto<object>(false, "Budget not found") );
        }

        return Ok(new HttpResponseDto<BudgetDto>(true, budget, "Budget Successfully Retrieved"));
    }


    [HttpPost]
    public async Task<ActionResult<BudgetDto>> Post(BudgetToCreateDto budgetDto)
    {
        BudgetDto? budget;
        Console.WriteLine( budgetDto.ReccuringInterval.ToString() );
        if (budgetDto.ReccuringInterval != null)
        {
            budget = await _budgetService.CreateRecurringBudget( budgetDto );
        } else
        {
            budget = await _budgetService.CreateOneBudget(budgetDto);
        }

        return CreatedAtAction(nameof(GetById), new { Id = budget.Id }, new HttpResponseDto<BudgetDto>(true, budget, "Budget Successfully Created" ));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, BudgetToUpdateDto budgetDto)
    {
         if ( id != budgetDto.Id )
         {
             return BadRequest( new HttpResponseDto<object>( false, "Id mismatch" ) );
         }

         var budget = await _budgetService.Update(id, budgetDto);

         if (budget == null)
         {
             return NotFound(new HttpResponseDto<object>(false, "Budget not found") );
         }

         return Ok(new HttpResponseDto<BudgetDto>(true, budget, "Budget Successfully Updated" ));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var budget = await _budgetService.Delete(id);

        if (budget == null)
        {
            return NotFound(new HttpResponseDto<object>(false, "Budget not found") );
        }

        return Ok(new HttpResponseDto<BudgetDto>(true, "Budget Successfully Deleted" ));
    }
}
