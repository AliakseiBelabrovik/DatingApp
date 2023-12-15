using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
//means, the route is api + / + take the first word from the class name
// => /api/users
public class BaseApiController : ControllerBase
{

}
