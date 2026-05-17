using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.src.Data;
using api.src.Entities;
using api.src.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace api.src.Services;

public class TokenService(IRolesRepository _rolesRepository, IConfiguration _config) : ITokenService
{
    public async Task<(string, DateTime)> GenerateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim(ClaimTypes.Name, user.UserName!),
            new Claim("displayName", user.DisplayName),
        };

        var roles = await _rolesRepository.GetUserRolesAsync(user);

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var jwtKey = _config["Jwt:Key"] ?? throw new InvalidOperationException("La clave secreta de JWT no está configurada.");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var expiresString = _config["Jwt:Expires"] ?? "01:00:00";
        var timeSpan = TimeSpan.Parse(expiresString);
        var expiresAt = DateTime.UtcNow.Add(timeSpan);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = expiresAt, // <-- Aplicamos los días aquí
            SigningCredentials = creds,
            Issuer = _config["Jwt:Issuer"],
            Audience = _config["Jwt:Audience"]
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return (tokenHandler.WriteToken(token), expiresAt);
    }
}
