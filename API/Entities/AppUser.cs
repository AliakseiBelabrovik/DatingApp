namespace API.Entities;

public class AppUser
{
    //should be called Id so that Entity Framework knows what is a foreign key
    public int Id { get; set; }
    public required string UserName { get; set; }

    public required byte[] PasswordHash { get; set; }

    public required byte[] PasswordSalt { get; set; }
}
