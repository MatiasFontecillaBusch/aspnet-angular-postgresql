using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace api.src.Entities;

public class User : IdentityUser
{
    public required string DisplayName { get; set; }
    public string? ImageUrl { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiry { get; set; }
    public int? ImageId { get; set; }

    [ForeignKey(nameof(ImageId))]
    public virtual Image? ImageData { get; set; } = null!;
}
