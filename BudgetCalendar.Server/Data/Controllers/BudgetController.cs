using BudgetCalendar.Server.Data.Models.DTOs;
using BudgetCalendar.Server.Data.Models.DTOs.BudgetDtos;
using BudgetCalendar.Server.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace BudgetCalendar.Server.Data.Controllers;

using Microsoft.AspNetCore.Authorization;

[Authorize]
[ApiController]
[Route( "api/[controller]" )]
public class BudgetController : ControllerBase
{
	private readonly IBudgetService _budgetService;

	public BudgetController(IBudgetService budgetService)
	{
		_budgetService = budgetService;
	}



	[HttpGet]
	public async Task<ActionResult<List<BudgetDto>>> GetBudgets([FromQuery] string? startDate, string? endDate)
	{
		List<BudgetDto> budgetDtosToSend = new List<BudgetDto>();

		if ( startDate != null && endDate != null )
		{
			budgetDtosToSend = await _budgetService.GetBudgets( new DateTime(Convert.ToInt32( startDate )), new DateTime( Convert.ToInt32( endDate ) ) );
        } else
		{
			budgetDtosToSend = await _budgetService.GetBudgets();
		}


		if ( budgetDtosToSend.Count > 0  )
		{
			return Ok( budgetDtosToSend);
		}

		return NotFound();

	}

[HttpGet( "{id}" )]
public async Task<ActionResult<BudgetDto>> GetById(int id)
{
	var budget = await _budgetService.GetById( id );

	if ( budget == null )
	{
		return NotFound( new HttpResponseDto<object>( false, "Budget not found" ) );
	}

	return Ok( new HttpResponseDto<BudgetDto>( true, budget, "Budget Successfully Retrieved" ) );
}


// [HttpPost]
// public async Task<ActionResult> Post(BudgetToCreateDto budgetDto)
// {
// 	Console.WriteLine( budgetDto.Date );
// 	bool response = false;
// 	if ( budgetDto.RecurringBudgetSequence != null )
// 	{
// 		response = await _budgetService.CreateRecurringBudget( budgetDto );
// 	} else
// 	{
// 		response = await _budgetService.CreateOneBudget( budgetDto );
// 	}
//
//
// 	if ( response == false )
// 	{
// 		return BadRequest( new HttpResponseDto<object>( false, "Budget not created" ) );
// 	} else
// 	{
// 		return Ok( new HttpResponseDto<object>( true, "Budget Successfully Created" ) );
// 	}
// }


[HttpPut( "{id}" )]
public async Task<IActionResult> Put(int id, BudgetToUpdateDto budgetDto)
{
	if ( id != budgetDto.Id )
	{
		return BadRequest( new HttpResponseDto<object>( false, "Id mismatch" ) );
	}

	var budget = await _budgetService.Update( id, budgetDto );

	if ( budget == null )
	{
		return NotFound( new HttpResponseDto<object>( false, "Budget not found" ) );
	}

	return Ok( new HttpResponseDto<BudgetDto>( true, budget, "Budget Successfully Updated" ) );
}

[HttpDelete( "{id}" )]
public async Task<IActionResult> Delete(int id)
{
	var budget = await _budgetService.Delete( id );

	if ( budget == null )
	{
		return NotFound( new HttpResponseDto<object>( false, "Budget not found" ) );
	}

	return Ok( new HttpResponseDto<BudgetDto>( true, "Budget Successfully Deleted" ) );
}

}