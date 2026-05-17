using System;
using api.src.DTOs;
using api.src.Entities;
using api.src.Responses;
using Microsoft.AspNetCore.Identity;

namespace api.src.Interfaces;

public interface IUserRepository
{
    Task<PagedResponse<UserResponse>> ReadAllAsync(GetUsersDto getUsersDto);
    Task<User?> GetByIdAsync(string id);
    Task<User?> GetByEmailAsync(string email);
    Task<IdentityResult> CreateAsync(User user, string password);
    Task<IdentityResult> UpdateAsync(User user);
    Task<IdentityResult> DeleteAsync(User user);
    Task<Boolean> CheckUserPassword(User user, string password);
}