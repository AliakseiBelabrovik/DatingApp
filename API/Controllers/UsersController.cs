using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")] //means, the route is api + / + take the first word from the class name
// => /api/users
public class UsersController : ControllerBase
{
    private DataContext Context { get; }

    public UsersController(DataContext context)
    {
        Context = context;
    }

    //Task is a asynchronous result
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        return await Context.Users.ToListAsync();
    }

    [HttpGet("{id}")] //api/users/2
    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
        return await this.Context.Users.FindAsync(id);
    }
}

