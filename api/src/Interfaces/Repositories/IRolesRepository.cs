using System;
using api.src.Entities;

namespace api.src.Interfaces;

public interface IRolesRepository
{
    Task<IList<string>> GetUserRolesAsync(User user);
}
