using Microsoft.AspNetCore.Authorization;

namespace BudgetCalendar.Server.Data.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BudgetController
{

}
