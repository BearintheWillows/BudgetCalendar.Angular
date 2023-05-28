
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using BudgetCalendar.Server.Auth.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace BudgetCalendar.Server.Auth.Services;
public interface ITokenService
{
    public SigningCredentials GetSigningCredentials();
    public Task<List<Claim>> GetClaims(User user);
    public JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims);
    public Task<string> GenerateRefreshToken();
    ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
}

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;
    private readonly IConfigurationSection _jwtSettings;
    private readonly UserManager<User> _userManager;


    public TokenService(IConfiguration configuration, UserManager<User> userManager)
    {
        _configuration = configuration;
        _userManager = userManager;
        _jwtSettings = _configuration.GetSection("JwtSettings");

    }

    public SigningCredentials GetSigningCredentials()
    {
        var key = Encoding.UTF8.GetBytes(_jwtSettings.GetSection("securityKey").Value);
        var secret = new SymmetricSecurityKey(key);

        return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
    }

    public async Task<List<Claim>> GetClaims(User user)
    {

        var claims = new List<Claim>
            {
            new Claim( ClaimTypes.Name, user.UserName ),
            new Claim( ClaimTypes.Email, user.Email ),
            new Claim( ClaimTypes.NameIdentifier, user.Id )

            };

        var roles = await _userManager.GetRolesAsync(user);
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        return claims;
    }

    public JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
    {
        var tokenOptions = new JwtSecurityToken(issuer: _jwtSettings.GetSection("issuer").Value,
                                                 audience: _jwtSettings.GetSection("audience").Value,
                                                 claims: claims,
                                                 expires: DateTime.Now.AddMinutes(
                                                     Convert.ToDouble(_jwtSettings["expireInMinutes"])
                                                 ),
                                                 signingCredentials: signingCredentials
        );

        return tokenOptions;
    }

    public async Task<string> GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = true,
            ValidateIssuer = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey =
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.GetSection("securityKey").Value)),
            ValidateLifetime = false, //here we are saying that we don't care about the token's expiration date
            ValidIssuer = _jwtSettings.GetSection("issuer").Value,
            ValidAudience = _jwtSettings.GetSection("audience").Value,
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        SecurityToken securityToken;
        var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
        var jwtSecurityToken = securityToken as JwtSecurityToken;
        if (jwtSecurityToken == null ||
             !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                                                  StringComparison.InvariantCultureIgnoreCase
             ))
            throw new SecurityTokenException("Invalid token");

        return principal;
    }
}