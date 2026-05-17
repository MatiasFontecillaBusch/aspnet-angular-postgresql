using System.ComponentModel.DataAnnotations;

namespace api.src.DTOs;

public class CreateProductDto
{
    [Required(ErrorMessage = "El nombre del producto es obligatorio.")]
    [StringLength(200, MinimumLength = 3, ErrorMessage = "El nombre debe tener entre 3 y 200 caracteres.")]
    public string? Name { get; set; }

    [Required(ErrorMessage = "El precio es obligatorio.")]
    [Range(0.01, 1000000, ErrorMessage = "El precio debe ser mayor a 0.")]
    public decimal? Price { get; set; }

    [Required(ErrorMessage = "El precio es obligatorio.")]
    [Range(1, int.MaxValue, ErrorMessage = "El stock debe ser mayor a 0.")]
    public int? Stock { get; set; }
}