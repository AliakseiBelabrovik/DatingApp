using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize] //-> will require authorization for each of the endpoints in this controller
public class UsersController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UsersController(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    //Task is a asynchronous result
    //[AllowAnonymous] //-> will allow to reach endpoints also for anonymous clients
    [HttpGet] //api/users/
    public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
    {
        // var users = await _userRepository.GetUsersAsync();
        // var memberDTOs = _mapper.Map<IEnumerable<MemberDTO>>(users); //automaps the appuser to memberDto
        return Ok(await _userRepository.GetMembersAsync());
    }


    [HttpGet("{username}")] // api/users/2
    public async Task<ActionResult<MemberDTO>> GetUser(string username)
    {
        return await _userRepository.GetMemberAsync(username);
    }

    // [HttpDelete("{id}")] // api/users/2
    // public async Task<ActionResult<AppUser>> DeleteUser(int id)
    // {
    //     var user = await _context.Users.FindAsync(id);
    //     if (user == null) return BadRequest("No user found");
    //     _context.Users.Remove(user);
    //     await _context.SaveChangesAsync();
    //     return user;
    // }
}

