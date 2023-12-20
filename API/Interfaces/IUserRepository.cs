using API.Entities;

namespace API;

public interface IUserRepository
{
    void Update(AppUser user);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<AppUser> GetUserByIdAsync(int id);
    Task<AppUser> GetUserByUserNameAsync(string userName);

    Task<IEnumerable<MemberDTO>> GetMembersAsync();//to automap to a member dto and not select all columns
    Task<MemberDTO> GetMemberAsync(string userName);

}
