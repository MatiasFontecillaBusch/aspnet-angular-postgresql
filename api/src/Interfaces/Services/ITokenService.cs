using System;
using api.src.Entities;

namespace api.src.Interfaces;

public interface ITokenService
{
    Task<(string, DateTime)> GenerateToken(User user);
}
