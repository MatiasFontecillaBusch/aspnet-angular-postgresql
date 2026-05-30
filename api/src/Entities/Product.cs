using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.src.Entities;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsAvailable { get; set; } = true;
    public int Stock { get; set; } = 0;
    public string? ImageUrl { get; set; } = null;

    // ==========================================
    // Claves Foráneas
    // ==========================================
    public required string CreatedById { get; set; }
    public int? ImageId { get; set; }

    [ForeignKey(nameof(CreatedById))]
    public virtual User CreatedBy { get; set; } = null!;

    [ForeignKey(nameof(ImageId))]
    public virtual Image? ImageData { get; set; } = null!;
}