namespace BudgetCalendar.Server.Data.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTOs;
using Services;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
	private readonly ICategoryService _categoryService;
	public CategoryController(ICategoryService categoryService)
	{
		_categoryService = categoryService;
	}
	
	[HttpGet]
	public async Task<ActionResult<List<CategoryDTO>>> Get()
	{
		return await _categoryService.GetAll();
	}
	
	[HttpGet("{id}")]
	public async Task<ActionResult<CategoryDTO>> GetById(int id)
	{
		var category = await _categoryService.GetById(id);

		if ( category == null )
		{
			return NotFound();
		}

		return category;
	}
	
	[HttpPost]
	public async Task<ActionResult<CategoryDTO>> Post(CategoryDTO categoryDTO)
	{
		var category = await _categoryService.Create(categoryDTO);

		return CreatedAtAction(nameof(GetById), new { Id = category.Id }, category);
	}
	
	[HttpPut("{id}")]
	public async Task<IActionResult> Put(int id, CategoryDTO categoryDTO)
	{
		// if ( id != categoryDTO.Id )
		// {
		// 	return BadRequest();
		// }

		var category = await _categoryService.Update(id, categoryDTO);

		if ( category == null )
		{
			return NotFound();
		}

		return Ok(category);
	}
	
	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(int id)
	{
		var isDeleted = await _categoryService.Delete(id);

		if ( isDeleted == false )
		{
			return NotFound();
		}

		return Ok(isDeleted);
	}
	
	
	
}