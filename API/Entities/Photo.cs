using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using API.Entities;

namespace API;

[Table("Photos")] //overwrite name of the table
public class Photo
{
    public int Id { get; set; }
    public string? Url { get; set; }

    [Column("IsMain", TypeName = "bit")]
    [DefaultValue(false)]
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }
    public int AppUserId { get; set; } //needs to ensure, that every photo has a user reference
    public AppUser AppUser { get; set; } //needs to ensure, that every photo has a user reference
    //plus if user is deleted, the photo is removed from the database too
}
