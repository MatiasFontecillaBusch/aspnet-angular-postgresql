using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_framework.Entities // Usa el namespace de tu proyecto legacy
{
    [Table("images")] // Forzamos el nombre de la tabla en minúsculas para PostgreSQL
    public class Image
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("url")]
        public string Url { get; set; }
        [Column("public_id")]
        public string PublicId { get; set; }
        [Column("image_id")]
        public int? ImageId { get; set; }
        [ForeignKey("ImageId")]
        public virtual Image ImageData { get; set; }
    }
}