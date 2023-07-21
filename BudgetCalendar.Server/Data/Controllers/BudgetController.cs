using BudgetCalendar.Server.Data.Models.DTOs;
using BudgetCalendar.Server.Data.Models.DTOs.BudgetDtos;
using BudgetCalendar.Server.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetCalendar.Server.Data.Controllers;

using System.Collections.ObjectModel;
using Models;

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
	public async Task<ActionResult<List<DayDto>>> GetCalendarBudgets([FromQuery] DateTime? startDate, DateTime? endDate)
	{
		List<BudgetDto> budgetsDtos = new List<BudgetDto>();

		if ( startDate != null && endDate != null )
		{
			List<Budget> budgets = await _budgetService.GetBudgetsByDates( startDate, endDate );

			if ( budgets.Count > 0 )
			{
				DateTime? budgetDate = startDate;
				foreach ( var budget in budgets )
				{
					if ( budgetDate != budget.Date ) continue;
					BudgetDto budgetDto = new()
						{
						Id = budget.Id,
						Amount = budget.Amount,
						Date = budget.Date,
						TransactionType = budget.TransactionType.ToString().ToLower(),
						Note = budget.Note,
						Color = budget.Color,
						Icon = budget.Icon,
						Account = new AccountDto() { Id = budget.Account.Id, },
						Category =
							new CategoryDto() { Name = budget.Category.Name, Id = budget.CategoryId, },
						RecurringBudgetSequence = new RecurringBudgetSequenceDto()
							{
							Id = budget.RecurringBudgetSequence.Id,
							StartDate = budget.RecurringBudgetSequence.StartDate,
							EndDate = budget.RecurringBudgetSequence.EndDate ?? null,
							Interval = budget.RecurringBudgetSequence.Interval.ToString().ToLower(),
							}
						};

					budgetsDtos.Add( budgetDto );
				}
			}

		} else
		{
			budgetsDtos = await _budgetService.GetAll();
		}


		if ( budgetsDtos.Count > 1  )
		{
			return Ok( budgetsDtos );
		} else
		{
			return NotFound();
		}
    
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


[HttpPost]
public async Task<ActionResult> Post(BudgetToCreateDto budgetDto)
{
	Console.WriteLine( budgetDto.Date );
	bool response = false;
	if ( budgetDto.RecurringBudgetSequence != null )
	{
		response = await _budgetService.CreateRecurringBudget( budgetDto );
	} else
	{
		response = await _budgetService.CreateOneBudget( budgetDto );
	}


	if ( response == false )
	{
		return BadRequest( new HttpResponseDto<object>( false, "Budget not created" ) );
	} else
	{
		return Ok( new HttpResponseDto<object>( true, "Budget Successfully Created" ) );
	}
}


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