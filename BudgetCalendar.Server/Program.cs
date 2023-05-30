using System.Text;
using BudgetCalendar.Server.Auth.Data;
using BudgetCalendar.Server.Auth.Entities;
using BudgetCalendar.Server.Auth.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Debug()
            .WriteTo.File("logs\\log.txt", rollingInterval: RollingInterval.Day)
            .WriteTo.Console(restrictedToMinimumLevel: LogEventLevel.Information)
            .CreateLogger();

builder.Services.AddCors(options =>
    {
        options.AddPolicy("CorsPolicy",
                           builder => builder.AllowAnyOrigin()
                                             .AllowAnyMethod()
                                             .AllowAnyHeader()
                                             .Build()
        );
    }
);

// Add Identity DbContext

builder.Services.AddDbContext<AuthDbContext>(options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("AuthDbConnection"));
    }
);

// Add Identity

builder.Services.AddIdentity<User, Role>(options =>
            {
                options.Password.RequiredLength = 6;
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.User.RequireUniqueEmail = false;
            }
        ).AddEntityFrameworkStores<AuthDbContext>()
       .AddDefaultTokenProviders();

var jwtSettings = builder.Configuration.GetSection("JwtSettings");
builder.Services.AddAuthentication(opt =>
    {
        opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }
).AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings.GetSection("issuer").Value,
            ValidAudience = jwtSettings.GetSection("audience").Value,
            IssuerSigningKey =
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.GetSection("securityKey").Value))
        };
    }
);

//Custom Services

builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("CorePolicy");

var scopeFactory = app.Services.GetRequiredService<IServiceScopeFactory>();
using (var scope = scopeFactory.CreateScope())
{
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
    var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();
    await AuthDbInitializer.SeedUsers(userManager, roleManager, configuration);
}

app.Run();