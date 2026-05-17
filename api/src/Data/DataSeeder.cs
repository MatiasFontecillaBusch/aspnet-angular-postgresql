using api.src.Entities;
using Microsoft.AspNetCore.Identity;

namespace api.src.Data;

public static class DataSeeder
{
    public static async Task SeedUsersAsync(UserManager<User> userManager)
    {
        if (!userManager.Users.Any())
        {
            var adminUser = new User
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "admin",
                Email = "admin@admin.com",
                DisplayName = "Administrador del Sistema",
                EmailConfirmed = true,
                ImageUrl = null
            };

            var user = await userManager.CreateAsync(adminUser, "admin.a.2026");

            if (!user.Succeeded)
            {
                var errors = string.Join(", ", user.Errors.Select(e => e.Description));
                throw new Exception($"Error crítico al ejecutar el seeder de usuarios: {errors}");
            }

            await userManager.AddToRoleAsync(adminUser, "Administrator");
        }
    }
}