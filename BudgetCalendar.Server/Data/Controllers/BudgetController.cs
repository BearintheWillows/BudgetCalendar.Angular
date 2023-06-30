using BudgetCalendar.Server.Data.Models.DTOs;
using BudgetCalendar.Server.Data.Models.DTOs.BudgetDtos;
using BudgetCalendar.Server.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetCalendar.Server.Data.Controllers;

using System.Collections.ObjectModel;
using Models;


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
        var budgets = await _budgetService.GetAll();

        if ( budgets.Count > 0 )
        {
            return Ok(new HttpResponseDto<List<BudgetDto>>( true, budgets, "Budgets Successfully Retrieved" ));
        }

        return NotFound( new HttpResponseDto<object>( false, "No Budgets Found" ));
    }
    
    
    [HttpGet("calendar-budgets")]
    public async Task<ActionResult<List<DayDto>>> GetCalendarBudgets([FromQuery]DateTime startDate,DateTime endDate)
    {
        Console.WriteLine(startDate);
        Console.WriteLine(endDate);
        List<Budget> budgets = await _budgetService.GetBudgetsByDates(startDate,endDate);
        List < DayDto > days = new List<DayDto>();
        if ( budgets.Count > 0 )
        {
            DayDto day = new DayDto();
            DateTime budgetDate = new DateTime(2023, 06, 1);
            budgetDate = budgets[0].Date;
  
            foreach ( var budget in budgets )
            {
                Console.WriteLine($"Budget 1 Date: {budget.Date}");
                Console.WriteLine(budget.Date.ToString());
                if ( budgetDate == budget.Date )
                {
                    day.Date = budgetDate;
                    Console.WriteLine($"BudgetDate Does eqial budgetDate: {budgetDate}");
                    
                    Console.WriteLine($"Account: {budget.Account.Id}");
                    Console.WriteLine($"Category: {budget.Category.Name}, {budget.Category.Id}");
                    Console.WriteLine($"RecurringBudgetSequence: {budget.RecurringBudgetSequence.Id}, {budget.RecurringBudgetSequence.StartDate}, {budget.RecurringBudgetSequence.EndDate}, {budget.RecurringBudgetSequence.Interval}");
                    
                    
                    day.Budgets.Add( new BudgetDto()
                        {
                        Id = budget.Id,
                        Amount = budget.Amount,
                        Date = budget.Date,
                        IsArchived = budget.IsArchived,
                        TransactionType = budget.TransactionType.ToString().ToLower(),
                        Note = budget.Note,
                        Color = budget.Color,
                        Icon = budget.Icon,
                        Account = new AccountDto() { Id = budget.Id, },
                        Category = new CategoryDto() { Name = budget.Category.Name, Id = budget.CategoryId},
                        RecurringBudgetSequence = new RecurringBudgetSequenceDto()
                            {
                            Id = budget.RecurringBudgetSequence.Id,
                            StartDate = budget.RecurringBudgetSequence.StartDate,
                            EndDate = budget.RecurringBudgetSequence.EndDate ?? null,
                            Interval = budget.RecurringBudgetSequence.Interval.ToString().ToLower()
                            }
                        });
                    
                    Console.WriteLine($"Day: {day.Date} Budget: {budget.Date}");
                        days.Add(day);
                } else
                {
                    
                    budgetDate = budget.Date;
                    day.Date = budgetDate;
                    day.Budgets.Add( new BudgetDto()
                    {
                        Id = budget.Id,
                        Amount = budget.Amount,
                        Date = budget.Date,
                        IsArchived = budget.IsArchived,
                        TransactionType = budget.TransactionType.ToString().ToLower(),
                        Note = budget.Note,
                        Color = budget.Color,
                        Icon = budget.Icon,
                        Account = new AccountDto()
                        {
                            Name = budget.Account.Name,
                        },
                        Category = new CategoryDto()
                        {
                            Name = budget.Category.Name,
                        },
                        RecurringBudgetSequence = new RecurringBudgetSequenceDto()
                        {
                            Id = budget.RecurringBudgetSequence.Id,
                        }
                    } );
                    Console.WriteLine($"Day: {day.Date} Budget: {budget.Date}");
                    days.Add(day);
                }
            }
            
            return Ok(new HttpResponseDto<List<DayDto>>( true, days, "Budgets Successfully Retrieved" ));

        }

        return NotFound( new HttpResponseDto<object>( false, "No Budgets Found" ));
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
     if (budgetDto.RecurringBudgetSequence != null)
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
