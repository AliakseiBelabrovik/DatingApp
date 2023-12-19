using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDTO
{
    [Required]
    public required string UserName { get; set; }

    [Required]
    [StringLength(8, MinimumLength = 4)]
    public required string Password { get; set; }
}