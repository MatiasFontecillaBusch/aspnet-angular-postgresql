using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNet.Identity.EntityFramework; // <-- IMPORTANTE: Cambió el namespace

namespace api_framework.Entities // Usa el namespace de tu proyecto legacy
{
    [Table("AspNetUsers")]
    public class User : IdentityUser
    {
        [Required] 
        [Column("display_name")]
        public string DisplayName { get; set; }
        [Column("image_url")]
        public string ImageUrl { get; set; }
        [Column("refresh_token")]
        public string RefreshToken { get; set; }
        [Column("refresh_token_expiry")]
        public DateTime? RefreshTokenExpiry { get; set; }
        [Column("image_id")]
        public int? ImageId { get; set; }
        [ForeignKey("ImageId")] 
        public virtual Image ImageData { get; set; }
    }
}