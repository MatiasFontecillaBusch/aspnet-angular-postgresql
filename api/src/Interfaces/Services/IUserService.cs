using System;
using api.src.DTOs;
using api.src.Responses;

namespace api.src.Services;

public interface IUserService
{
    Task<PagedResponse<UserResponse>> GetUsersAsync(GetUsersDto getUsersDto);
    Task<UserResponse?> GetUserByIdAsync(string id);
    Task<UserResponse> CreateUserAsync(CreateUserDto createUserDto);
    Task<UserResponse> UpdateUserAsync(string id, UpdateUserDto updateUserDto);
    Task<bool> DeleteUserAsync(string id);
}