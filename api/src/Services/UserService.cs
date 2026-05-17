using api.src.DTOs;
using api.src.Entities;
using api.src.Exceptions;
using api.src.Interfaces;
using api.src.Responses;

namespace api.src.Services;

public class UserService(IUserRepository _userRepository) : IUserService
{
    public async Task<PagedResponse<UserResponse>> GetUsersAsync(GetUsersDto getUsersDto)
    {
        return await _userRepository.ReadAllAsync(getUsersDto);
    }

    public async Task<UserResponse?> GetUserByIdAsync(string id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null) return null;

        return new UserResponse
        {
            Id = user.Id,
            Username = user.UserName ?? string.Empty,
            Email = user.Email ?? string.Empty,
            DisplayName = user.DisplayName,
            ImageUrl = user.ImageUrl
        };
    }

    public async Task<UserResponse> CreateUserAsync(CreateUserDto createUserDto)
    {
        var existingUser = await _userRepository.GetByEmailAsync(createUserDto.Email);
        if (existingUser != null)
        {
            throw new AppError("El correo electrónico ya se encuentra registrado.", 400);
        }

        var user = new User
        {
            UserName = createUserDto.Username,
            Email = createUserDto.Email,
            DisplayName = createUserDto.DisplayName,
            ImageUrl = createUserDto.ImageUrl
        };

        var result = await _userRepository.CreateAsync(user, createUserDto.Password);

        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new AppError($"Error al crear el usuario: {errors}", 400);
        }

        return new UserResponse
        {
            Id = user.Id,
            Username = user.UserName,
            Email = user.Email,
            DisplayName = user.DisplayName,
            ImageUrl = user.ImageUrl
        };
    }

    public async Task<UserResponse> UpdateUserAsync(string id, UpdateUserDto updateUserDto)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null) throw new AppError("Usuario no encontrado", 404);

        user.DisplayName = updateUserDto.DisplayName ?? user.DisplayName;
        user.ImageUrl = updateUserDto.ImageUrl ?? user.ImageUrl;

        if (!string.IsNullOrWhiteSpace(updateUserDto.Email) && user.Email != updateUserDto.Email)
        {
            user.Email = updateUserDto.Email;
            user.NormalizedEmail = updateUserDto.Email.ToUpperInvariant();
        }

        var result = await _userRepository.UpdateAsync(user);
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new AppError($"Error al actualizar el usuario: {errors}", 400);
        }

        return new UserResponse
        {
            Id = user.Id,
            Username = user.UserName ?? string.Empty,
            Email = user.Email ?? string.Empty,
            DisplayName = user.DisplayName,
            ImageUrl = user.ImageUrl
        };
    }

    public async Task<bool> DeleteUserAsync(string id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null) return false;

        var result = await _userRepository.DeleteAsync(user);
        return result.Succeeded;
    }
}