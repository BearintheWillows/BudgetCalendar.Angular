using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using BudgetCalendar.Server.Auth.Services;
using System.IdentityModel.Tokens.Jwt;
using BudgetCalendar.Server.Auth.Entities;
using BudgetCalendar.Server.Auth.DTOs.Tokens;
using BudgetCalendar.Server.Auth.DTOs.Authentication;

namespace BudgetCalendar.Server.Auth.Controllers;
[Route("api/auth/token")]
[ApiController]
public class TokenController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;

    public TokenController(UserManager<User> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshTokenDto refreshTokenDto)
    {
        AuthenticationResponseDto authResponse = new();

        if (refreshTokenDto is null)
        {
            authResponse.IsAuthSuccessful = false;
            authResponse.ErrorMessage = "Invalid Client Request";
            return BadRequest(authResponse);
        }

        var principal = _tokenService.GetPrincipalFromExpiredToken(refreshTokenDto.Token);
        var username = principal.Identity?.Name;

        var user = await _userManager.FindByNameAsync(username);

        if (user == null || user.RefreshToken != refreshTokenDto.RefreshToken ||
             user.RefreshTokenExpiryTime <= DateTime.Now)
        {
            Console.WriteLine("It's this error");
            Console.WriteLine("user: " + user);
            Console.WriteLine("user.RefreshToken: " + user.RefreshToken);
            Console.WriteLine("RefreshTokenDto.RefreshToken: " + refreshTokenDto.RefreshToken);
            Console.WriteLine(user.RefreshTokenExpiryTime <= DateTime.Now);

            authResponse.IsAuthSuccessful = false;
            authResponse.ErrorMessage = "Invalid Client Request";

            return BadRequest(authResponse);
        }


        var signingCredentials = _tokenService.GetSigningCredentials();
        var claims = await _tokenService.GetClaims(user);
        var tokenOptions = _tokenService.GenerateTokenOptions(signingCredentials, claims);
        var newToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        user.RefreshToken = await _tokenService.GenerateRefreshToken();

        await _userManager.UpdateAsync(user);

        authResponse.IsAuthSuccessful = true;
        authResponse.Token = newToken;
        authResponse.RefreshToken = user.RefreshToken;

        Console.WriteLine("authResponse: " + authResponse.IsAuthSuccessful);
        Console.WriteLine("authResponse: " + authResponse.Token);
        Console.WriteLine("authResponse: " + authResponse.RefreshToken);


        return Ok(authResponse);
    }
}