using System;
using System.ComponentModel.DataAnnotations;

namespace api.src.DTOs;

public class UpdateProductDto
{

    [StringLength(200, MinimumLength = 3, ErrorMessage = "El nombre debe tener entre 3 y 200 caracteres.")]
    public string? Name { get; set; }

    [Range(0.01, 1000000, ErrorMessage = "El precio debe ser mayor a 0.")]
    public decimal? Price { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "El stock debe ser mayor a -1.")]
    public int? Stock { get; set; }
}
