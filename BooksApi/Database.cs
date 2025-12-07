using Microsoft.EntityFrameworkCore;
using BooksApi.Models;

namespace BooksApi.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // !Tabeller
    public DbSet<User> Users { get; set; }
    public DbSet<Book> Books { get; set; }
    public DbSet<Quote> Quotes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      // !One-to-Many relation
      modelBuilder.Entity<User>()
          .HasMany(u => u.Books)
          .WithOne(b => b.User)
          .HasForeignKey(b => b.UserId)
          .OnDelete(DeleteBehavior.Cascade);

      modelBuilder.Entity<User>()
          .HasMany(u => u.Quotes)
          .WithOne(q => q.User)
          .HasForeignKey(q => q.UserId)
          .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
