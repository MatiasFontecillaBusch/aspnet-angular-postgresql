using api_framework.Data;
using api_framework.Entities;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

[DbConfigurationType(typeof(PostgresConfiguration))]
public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext() : base("name=PostgresConn")
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Image> Images { get; set; }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("public");

        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>().ToTable("aspnet_users");
        modelBuilder.Entity<IdentityRole>().ToTable("aspnet_roles");
        modelBuilder.Entity<IdentityUserRole>().ToTable("aspnet_user_roles");
        modelBuilder.Entity<IdentityUserClaim>().ToTable("aspnet_user_claims");
        modelBuilder.Entity<IdentityUserLogin>().ToTable("aspnet_user_logins");
    }
}