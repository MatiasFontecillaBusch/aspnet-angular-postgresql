using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.src.Entities;

public class Image
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public string? publicId { get; set; }


    public int ImageId { get; set; }

    [ForeignKey(nameof(ImageId))]
    public virtual Image ImageData { get; set; } = null!;
}
