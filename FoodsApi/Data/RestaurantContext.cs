using Microsoft.EntityFrameworkCore;
using FoodsApi.Models;

namespace FoodsApi.Data
{
    public class RestaurantContext : DbContext
    {
        public DbSet<Meal> Meals { get; set; }
        public DbSet<MealIngredient> MealIngredients { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        public RestaurantContext(DbContextOptions<RestaurantContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the relationship between Meal and Order
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Meal)
                .WithMany(m => m.Orders)
                .HasForeignKey(o => o.MealId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure the relationship between Meal and MealIngredient
            modelBuilder.Entity<Meal>()
                .HasMany(m => m.Ingredients)
                .WithMany(i => i.Meals)
                .UsingEntity(j => j.ToTable("MealIngredientMeals"));

            // Configure the User entity
            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.PasswordHash)
                .IsRequired();

            // Configure the one-to-many relationship between User and Role
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role) // A user has one role
                .WithMany(r => r.Users) // A role can have many users
                .HasForeignKey(u => u.RoleId) // Foreign key in User
                .OnDelete(DeleteBehavior.Restrict); // Prevent role deletion if users are associated
        }
    }
}