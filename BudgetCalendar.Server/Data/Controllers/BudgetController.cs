using BudgetCalendar.Server.Data.Models.DTOs;
using BudgetCalendar.Server.Data.Models.DTOs.BudgetDTOs;
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
    public async Task<ActionResult<List<BudgetDTO>>> Get()
    {
        return await _budgetService.GetAll();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BudgetDTO>> GetById(int id)
    {
        var budget = await _budgetService.GetById(id);

        if (budget == null)
        {
            return NotFound(new HttpResponseDTO<object>
            {
                isSuccess = false,
                Errors = new List<string> { "Budget not found" }
            } );
        }

        return budget;
    }

    [HttpPost]
    public async Task<ActionResult<BudgetDTO>> Post(BudgetToCreateDTO budgetDTO)
    {
        var budget = await _budgetService.Create(budgetDTO);

        return CreatedAtAction(nameof(GetById), new { Id = budget.Id }, new HttpResponseDTO<BudgetDTO>
        {
            isSuccess = true,
            Data = budget
        } );
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, BudgetToUpdateDTO budgetDTO)
    {
         if ( id != budgetDTO.Id )
         {
         	return BadRequest(new HttpResponseDTO<object>
             {
                isSuccess = false,
                Errors = new List<string> { "Id mismatch" }
             } );
         }

        var budget = await _budgetService.Update(id, budgetDTO);

        if (budget == null)
        {
            return NotFound(new HttpResponseDTO<object>
            {
                isSuccess = false,
                Errors = new List<string> { "Budget not found" }
            } );
        }

        return Ok(new HttpResponseDTO<BudgetDTO>
        {
            isSuccess = true,
            Data = budget
        } );
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var budget = await _budgetService.Delete(id);

        if (budget == null)
        {
            return NotFound(new HttpResponseDTO<object>
            {
                isSuccess = false,
                Errors = new List<string> { "Budget not found" }
            } );
        }

        return Ok(new HttpResponseDTO<BudgetDTO>
        {
            isSuccess = true,
        } );
    }
}
