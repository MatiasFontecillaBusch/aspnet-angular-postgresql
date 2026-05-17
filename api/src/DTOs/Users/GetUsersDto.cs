using System;
using System.ComponentModel.DataAnnotations;

namespace api.src.DTOs;

public class GetUsersDto : PagingDto
{
    public string? DisplayName { get; set; }
    public string? Email { get; set; }
}
