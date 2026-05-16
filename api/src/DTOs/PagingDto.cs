using System;
using System.ComponentModel.DataAnnotations;

namespace api.src.DTOs;

public class PagingDto
{
    public int Page { get; set; } = 1;
    [Range(1, 200, ErrorMessage = "El tamaño de la pagina debe ser entre 1 y 200.")]
    public int PageSize { get; set; } = 10;
    
}
