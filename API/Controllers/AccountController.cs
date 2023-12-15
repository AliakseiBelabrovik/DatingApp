using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


public class AccountController : BaseApiController
{
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;

    public AccountController(DataContext context, ITokenService tokenService)
    {
        _tokenService = tokenService;
        _context = context;
    }

    [HttpPost("register")] //POST: api/account/register
    public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
    {
        if (await this.UserExists(registerDTO.UserName))
        {
            return BadRequest("Username is taken");
        }

        using var hmac = new HMACSHA512(); //will be password salt
        //consumes to much memory -> so we want to free the memory, once we don't need it
        //this happes automtically -> "using" before the variable

        var user = new AppUser
        {
            UserName = registerDTO.UserName,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
            PasswordSalt = hmac.Key
        };

        _context.Users.Add(user); //not saved yet
        await _context.SaveChangesAsync(); //saves changes to the database
        //return modified user with token
        return new UserDTO
        {
            UserName = user.UserName,
            Token = _tokenService.CreateToken(user)
        };
    }

    private async Task<bool> UserExists(string userName)
    {
        return await _context.Users.AnyAsync(user => user.UserName.ToLower() == userName.ToLower());
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
    {
        var user = await _context.Users.SingleOrDefaultAsync<AppUser>(x => x.UserName.ToLower() == loginDTO.UserName.ToLower());
        if (user == null) return Unauthorized("invalid username");

        using var hmac = new HMACSHA512(user.PasswordSalt);
        //hashed password of the user who wants to login
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));
        //compate it with the real hashed password from the database
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("invalid password");
        }

        return new UserDTO
        {
            UserName = user.UserName,
            Token = _tokenService.CreateToken(user)
        };
    }
}