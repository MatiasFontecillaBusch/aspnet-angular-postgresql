using System;
using api.src.Entities;
using api.src.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace api.src.Data;

public class RolesRepository(UserManager<User> _userManager) : IRolesRepository
{
    public async Task<IList<string>> GetUserRolesAsync(User user)
    {
        return await _userManager.GetRolesAsync(user);
    }
}
