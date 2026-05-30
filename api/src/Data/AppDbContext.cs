using api.src.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.src.Data;

public class AppDbContext : IdentityDbContext<User>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Image> Images => Set<Image>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>()
        .HasData(
            new IdentityRole
            {
                Id = "admin-id",
                Name = "Administrator",
                NormalizedName = "ADMINISTRATOR",
                ConcurrencyStamp = "b7a699cb-80df-432f-b340-d2052a608de5",
            }
        );

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Price).HasColumnType("numeric(18,2)");

            entity.Property(e => e.Stock).IsRequired();

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("NOW()");

            entity.HasOne(p => p.CreatedBy)
                  .WithMany()
                  .HasForeignKey(p => p.CreatedById)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(p => p.ImageData)
                  .WithMany()
                  .HasForeignKey(p => p.ImageId)
                  .OnDelete(DeleteBehavior.SetNull);
        });


        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(u => u.DisplayName)
                  .IsRequired()
                  .HasMaxLength(100);

            entity.Property(u => u.ImageUrl)
                  .IsRequired(false);

            entity.Property(u => u.RefreshToken)
                  .IsRequired(false)
                  .HasMaxLength(500);

            entity.Property(u => u.RefreshTokenExpiry)
                  .IsRequired(false);

            entity.HasOne(u => u.ImageData)
                  .WithMany()
                  .HasForeignKey(u => u.ImageId)
                  .OnDelete(DeleteBehavior.SetNull);
        });
    }
}