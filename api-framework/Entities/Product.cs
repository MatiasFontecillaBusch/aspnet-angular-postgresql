using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Newtonsoft.Json;
using System.Web;

namespace api_framework.Entities
{
    [Table("products")]
    public class Product
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("price")]
        public decimal Price { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        [Column("is_available")]
        public bool IsAvailable { get; set; }
        [Column("stock")]
        public int Stock { get; set; }
        //[Column("image_url")]
        //public string ImageUrl { get; set; }

        // ==========================================
        // Claves Foráneas
        // ==========================================
        [Required]
        [Column("created_by_id")]
        public  string CreatedById { get; set; }
        //[Column("image_id")]
        //public int? ImageId { get; set; }

        [ForeignKey("CreatedById")]
        [JsonIgnore]
        public virtual User CreatedBy { get; set; }

        //[ForeignKey("ImageId")]
        //public virtual Image ImageData { get; set; }
    }
}