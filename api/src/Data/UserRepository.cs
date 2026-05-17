using System;
using api.src.DTOs;
using api.src.Entities;
using api.src.Interfaces;
using api.src.Responses;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.src.Data;

public class UserRepository(UserManager<User> _userManager) : IUserRepository
{
    public async Task<PagedResponse<UserResponse>> ReadAllAsync(GetUsersDto getUsersDto)
    {
        var query = _userManager.Users
            .AsNoTracking().AsQueryable();


        if (!string.IsNullOrWhiteSpace(getUsersDto.DisplayName))
        {
            var searchTerm = getUsersDto.DisplayName.Trim().ToLower();
            query = query.Where(x => x.DisplayName != null && x.DisplayName.ToLower().Contains(searchTerm));
        }

        if (!string.IsNullOrWhiteSpace(getUsersDto.Email))
        {
            var searchTerm = getUsersDto.Email.Trim().ToLower();
            query = query.Where(x => x.Email != null && x.Email.ToLower().Contains(searchTerm));
        }

        var pagedUsers = await PagedHelper.CreateAsync<User, string>(
            query,
            getUsersDto.Page,
            getUsersDto.PageSize,
            x => x.Id,
            isDescending: true
        );
        return new PagedResponse<UserResponse>
        {
            TotalCount = pagedUsers.TotalCount,
            PageNumber = pagedUsers.PageNumber,
            PageSize = pagedUsers.PageSize,
            Items = pagedUsers.Items.Select(u => new UserResponse
            {
                Id = u.Id,
                Username = u.UserName ?? string.Empty,
                Email = u.Email ?? string.Empty,
                DisplayName = u.DisplayName,
                ImageUrl = u.ImageUrl
            }).ToList()
        };
    }

    public async Task<User?> GetByIdAsync(string id)
    {
        return await _userManager.FindByIdAsync(id);
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _userManager.FindByEmailAsync(email);
    }

    public async Task<IdentityResult> CreateAsync(User user, string password)
    {
        return await _userManager.CreateAsync(user, password);
    }

    public async Task<IdentityResult> UpdateAsync(User user)
    {
        return await _userManager.UpdateAsync(user);
    }

    public async Task<IdentityResult> DeleteAsync(User user)
    {
        return await _userManager.DeleteAsync(user);
    }

    public async Task<Boolean> CheckUserPassword(User user, string password)
    {
        return await _userManager.CheckPasswordAsync(user, password);
    }
}