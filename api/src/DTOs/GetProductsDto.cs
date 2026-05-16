using System;
using System.ComponentModel.DataAnnotations;

namespace api.src.DTOs;

public class GetProductsDto : PagingDto
{
    public string? Name { get; set; }
    public bool? IsAvailable { get; set; }
}
