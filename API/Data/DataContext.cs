using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    //model -> table Users for AppUser entity class
    public DbSet<AppUser> Users { get; set; }
}
