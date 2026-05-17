using System;
using System.ComponentModel.DataAnnotations;

namespace api.src.DTOs;

public class UpdateUserDto
{
    [Required(ErrorMessage = "El nombre a mostrar es obligatorio.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "El nombre debe tener entre 2 y 100 caracteres.")]
    public string DisplayName { get; set; } = string.Empty;

    [EmailAddress(ErrorMessage = "El formato del correo electrónico no es válido.")]
    public string? Email { get; set; }

    public string? ImageUrl { get; set; }
}