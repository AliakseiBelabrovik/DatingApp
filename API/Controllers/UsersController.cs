using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize] //-> will require authorization for each of the endpoints in this controller
public class UsersController : BaseApiController
{
    private DataContext _context { get; }

    public UsersController(DataContext context)
    {
        _context = context;
    }

    //Task is a asynchronous result
    [AllowAnonymous] //-> will allow to reach endpoints also for anonymous clients
    [HttpGet] //api/users/
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }


    [HttpGet("{id}")] // api/users/2
    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
        return await this._context.Users.FindAsync(id);
    }
}

