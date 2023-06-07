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
	public async Task<ActionResult<List<CategoryDto>>> Get()
	{
		List<CategoryDto> categories = await _categoryService.GetAll();
		
		return Ok(new HttpResponseDto<List<CategoryDto>>(true, categories, "Categories Successfully Retrieved"));
	}
	
	[HttpGet("{id}")]
	public async Task<ActionResult<CategoryDto>> GetById(int id)
	{
		var category = await _categoryService.GetById(id);

		if ( category == null )
		{
			return NotFound(new HttpResponseDto<object>( false, "Category not found" ));
		}

		return Ok( new HttpResponseDto<CategoryDto>( true, category, "Category Successfully Retrieved" ) );
	}
	
	[HttpPost]
	public async Task<ActionResult<CategoryDto>> Post(CategoryDto categoryDto)
	{
		var category = await _categoryService.Create(categoryDto);

		return CreatedAtAction(nameof(GetById), new { Id = category.Id }, new HttpResponseDto<CategoryDto>(true, category, "Category Successfully Created"));
	}
	
	[HttpPut("{id}")]
	public async Task<IActionResult> Put(int id, CategoryDto categoryDto)
	{
		if ( id != categoryDto.Id )
		{
			return BadRequest(new HttpResponseDto<object>(false, "Category Id mismatch"));
		}

		var category = await _categoryService.Update(id, categoryDto);

		if ( category == null )
		{
			return NotFound( new HttpResponseDto<object>(false, "Category not found"  ));
		}

		return Ok( new HttpResponseDto<CategoryDto>(true, category, "Category Successfully Updated"));
	}
	
	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(int id)
	{
		var isDeleted = await _categoryService.Delete(id);

		if ( isDeleted == false )
		{
			return NotFound(new HttpResponseDto<object>(false, "Category not found"  ));
		}

		return Ok(new HttpResponseDto<object>(true, "Category Successfully Deleted"));
	}
	
	
	
}