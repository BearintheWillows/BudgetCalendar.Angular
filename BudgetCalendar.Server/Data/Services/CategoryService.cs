namespace BudgetCalendar.Server.Data.Services;

using System.Security.Claims;
using Auth.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs;

public interface ICategoryService
{
	Task<List<CategoryDTO>> GetAll();
	Task<CategoryDTO?>      GetById(int        id);
	Task<CategoryDTO?>      Create(CategoryDTO categoryDto);
	Task<CategoryDTO?>      Update(int         id, CategoryDTO categoryDto);
	Task<bool?>             Delete(int         id);
}

[Authorize]
public class CategoryService : ICategoryService
{
	private readonly DataDbContext        _context;
	private readonly IHttpContextAccessor _httpContextAccessor;
	
	private readonly string? _userId;

	public CategoryService(DataDbContext context, IHttpContextAccessor httpContextAccessor)
	{
		_context = context;
		_httpContextAccessor = httpContextAccessor;
		
		_userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
	}
	
	public async Task<List<CategoryDTO>> GetAll()
	{
		return await _context.Categories.Where( c => c.UserId == _userId ).Select( c => new CategoryDTO()
			{
			Id = c.Id,
			Name = c.Name
			} ).ToListAsync();
	}
	
	public async Task<CategoryDTO?> GetById(int id)
	{
		var category = await _context.Categories.Where( c => c.UserId == _userId ).FirstOrDefaultAsync( c => c.Id == id );

		if ( category == null )
		{
			return null;
		}

		return new CategoryDTO()
			{
			Id = category.Id,
			Name = category.Name
			};
	}

	public async Task<CategoryDTO?> Create(CategoryDTO categoryDto)
	{
		var category = new Category()
			{
			Id = categoryDto.Id,
			Name = categoryDto.Name,
			UserId = _userId
			};

		_context.Categories.Add(category);
		//get id of last added item
		
		 
		
		await _context.SaveChangesAsync();

		return new CategoryDTO()
			{
			Id = category.Id,
			Name = category.Name
			};
	}

	public async Task<CategoryDTO?> Update(int id, CategoryDTO categoryDto)
	{
		
		var category = await _context.Categories.Where( c => c.UserId == _userId ).FirstOrDefaultAsync( c => c.Id == id );

		if ( category == null )
		{
			return null;
		}

		category.Name = categoryDto.Name;

		await _context.SaveChangesAsync();
		
		return new CategoryDTO()
		{
			Id = category.Id,
			Name = category.Name
		};
	}

	public async Task<bool?> Delete(int id)
	{
		
		var category = await _context.Categories.Where( c => c.UserId == _userId ).FirstOrDefaultAsync( c => c.Id == id );

		if ( category == null )
		{
			return false;
		}

		_context.Categories.Remove(category);
		await _context.SaveChangesAsync();

		return true;
	}
}