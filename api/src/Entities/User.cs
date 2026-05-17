using System;
using Microsoft.AspNetCore.Identity;

namespace api.src.Entities;

public class User : IdentityUser
{
    public required string DisplayName { get; set; }
    public string? ImageUrl { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiry { get; set; }
}
