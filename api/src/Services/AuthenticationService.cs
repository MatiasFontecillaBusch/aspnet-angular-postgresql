using System;
using api.src.DTOs;
using api.src.Exceptions;
using api.src.Interfaces;
using api.src.Responses;

namespace api.src.Services;

public class AuthenticationService(IUserRepository _userRepository, ITokenService _tokenService) : IAuthenticationService
{
    public async Task<LoginResponse> Login(LoginDto loginDto)
    {
        var user = await _userRepository.GetByEmailAsync(loginDto.Email);

        if (user == null) throw new AppError("Credenciales invalidas", 401);

        var result = await _userRepository.CheckUserPassword(user, loginDto.Password);

        if(!result) throw new AppError("Credenciales invalidas", 401);

        var (token, expiresAt) = await _tokenService.GenerateToken(user);

        var userResponse = new UserResponse
        {
            Id = user.Id,
            DisplayName = user.DisplayName,
            Email = user.Email!,
            ImageUrl = user.ImageUrl ?? "",
            Username = user.UserName!,
        };

        return new LoginResponse
        {
            User = userResponse,
            Token = token,
            TokenExpiration = expiresAt,
            RefreshToken = token,
            RefreshTokenExpiration = expiresAt
        };
    }

}
