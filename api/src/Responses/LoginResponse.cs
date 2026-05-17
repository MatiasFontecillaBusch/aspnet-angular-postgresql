using System;

namespace api.src.Responses;

public class LoginResponse
{
    public string Token { get; set; } = string.Empty;
    public DateTime TokenExpiration { get; set; }

    public string RefreshToken { get; set; } = string.Empty;
    public DateTime RefreshTokenExpiration { get; set; }

    public UserResponse User { get; set; } = null!;
}
