using API.Data;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API;

public class UserRepository : IUserRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public UserRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<AppUser> GetUserByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<AppUser> GetUserByUserNameAsync(string userName)
    {
        return await _context.Users
            .Include(u => u.Photos)
            .SingleOrDefaultAsync(user => user.UserName == userName);
    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        //initially, entity framework is lazy, so the users will be loaded with empty photos array
        return await _context.Users
            .Include(u => u.Photos) //Eager loading -> wir lösen PHOTOS Tabelle auf / left joint
            .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public void Update(AppUser user)
    {
        //tells them Context that the are some changes in the entity. here will nothing be saved, use SaveChangesAsync method for this
        _context.Entry(user).State = EntityState.Modified;
    }

    public async Task<MemberDTO> GetMemberAsync(string userName)
    {
        return await _context.Users
            .Where(u => u.UserName == userName)
            .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider) //we select only columns which are needed for memberDTO
            .SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<MemberDTO>> GetMembersAsync()
    {
        return await _context.Users
            .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider) //we select only columns which are needed for memberDTO
            .ToListAsync();
    }
}
