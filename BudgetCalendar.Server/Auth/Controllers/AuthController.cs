using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using BudgetCalendar.Server.Auth.Services;
using Mapster;
using System.IdentityModel.Tokens.Jwt;
using BudgetCalendar.Server.Auth.Entities;
using BudgetCalendar.Server.Auth.DTOs.Registration;
using BudgetCalendar.Server.Auth.DTOs.Authentication;

namespace BudgetCalendar.Server.Auth.Controllers;
[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;
    private readonly RoleManager<Role> _roleManager;
    private List<string> _errors = new List<string>();
    private bool _isSuccessful = true;

    public AuthController(UserManager<User> userManager, ITokenService tokenService, RoleManager<Role> roleManager)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _roleManager = roleManager;

    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto? userForRegistration)
    {
        //check if user exists
        var emailExist = _userManager.FindByEmailAsync(userForRegistration.Email).ContinueWith(task =>
            {
                return task.Result;
            }
        ).Result;

        if (userForRegistration == null)
        {
            _errors.Add("User object is null");
            _isSuccessful = false;
        }

        if (emailExist != null)
        {
            _errors.Add("Email already exists");
            _isSuccessful = false;
        }

        if (!ModelState.IsValid)
        {
            _errors.Add("Invalid model object");
            _isSuccessful = false;
        }

        if (!_isSuccessful)
        {
            return BadRequest(new RegistrationResponseDto { IsSuccessful = false, Errors = _errors });
        }

        User user = userForRegistration.Adapt<User>();

        user.UserName = userForRegistration.Email.Split('/' )[0];

        var result = await _userManager.CreateAsync(user, userForRegistration.Password);

        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description);

            return BadRequest(new RegistrationResponseDto { IsSuccessful = false, Errors = errors });
        }

        return Ok(new RegistrationResponseDto { IsSuccessful = true });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserForAuthenticationDto? userForAuthentication)
    {
        AuthenticationResponseDto authResponse = new();

        if (userForAuthentication == null || !ModelState.IsValid)
        {
            authResponse.IsAuthSuccessful = false;
            authResponse.ErrorMessage = "Invalid Request";
            return BadRequest(authResponse);
        }

        if (userForAuthentication.Email != null)
        {
            var user = await _userManager.FindByEmailAsync(userForAuthentication.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, userForAuthentication.Password))
            {

                authResponse.IsAuthSuccessful = false;
                authResponse.ErrorMessage = "Invalid Email or Password";
                return Unauthorized(authResponse);
            }


            var signingCredentials = _tokenService.GetSigningCredentials();
            var claims = await _tokenService.GetClaims(user);
            var tokenOptions = _tokenService.GenerateTokenOptions(signingCredentials, claims);
            var jwtToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            user.RefreshToken = await _tokenService.GenerateRefreshToken();
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);


            authResponse.IsAuthSuccessful = true;
            authResponse.Token = jwtToken;
            authResponse.RefreshToken = user.RefreshToken;
            authResponse.UserName = user.UserName;
            
            await _userManager.UpdateAsync(user);

            //save changes to db
            
            return Ok(authResponse);
        }
        else
        {
            authResponse.IsAuthSuccessful = false;
            authResponse.ErrorMessage = "Email Required";
            return BadRequest(authResponse);
        }
    }
}