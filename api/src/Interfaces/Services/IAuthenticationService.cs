using System;
using api.src.DTOs;
using api.src.Responses;

namespace api.src.Interfaces;

public interface IAuthenticationService
{
    Task<LoginResponse> Login(LoginDto loginDto);
}
