using FoodsApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FoodsApi.Data
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<RestaurantContext>();
            await context.Database.EnsureCreatedAsync();

            // Seed Roles if they don't exist
            if (!context.Roles.Any())
            {
                var roles = new List<Role>
                {
                    new Role { Name = "Admin" },
                    new Role { Name = "Chef" },
                    new Role { Name = "Client" }
                };

                await context.Roles.AddRangeAsync(roles);
                await context.SaveChangesAsync();
            }

            // Seed Admin User if they don't exist
            if (!context.Users.Any(u => u.Email == "mohamedlemine.telmoudy@gmail.com"))
            {
                // Find the Admin role
                var adminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "Admin");
                if (adminRole == null)
                {
                    throw new Exception("Admin role not found in the database.");
                }

                // Hash the password
                var passwordHash = BCrypt.Net.BCrypt.HashPassword("webapipfesmpnt");

                // Create the admin user
                var adminUser = new User
                {
                    Email = "mohamedlemine.telmoudy@gmail.com",
                    PasswordHash = passwordHash,
                    RoleId = adminRole.Id, // Assign the Admin role
                    IsVerified = true, // Mark the user as verified
                    VerificationCode = null, // No verification code needed
                    ResetPasswordCode = null // No reset code needed
                };

                await context.Users.AddAsync(adminUser);
                await context.SaveChangesAsync();
            }

            // Seed Ingredients and Meals if they don't exist
     // Seed Ingredients and Meals if they don't exist
if (!context.MealIngredients.Any() && !context.Meals.Any())
{
    // Create some ingredients
    var ingredients = new List<MealIngredient>
    {
        new MealIngredient { Name = "Chicken", Category = "Protein", Meals = new List<Meal>() },
        new MealIngredient { Name = "Rice", Category = "Grain", Meals = new List<Meal>() },
        new MealIngredient { Name = "Tomato", Category = "Vegetable", Meals = new List<Meal>() },
        new MealIngredient { Name = "Onion", Category = "Vegetable", Meals = new List<Meal>() },
        new MealIngredient { Name = "Garlic", Category = "Vegetable", Meals = new List<Meal>() },
        new MealIngredient { Name = "Olive Oil", Category = "Fat", Meals = new List<Meal>() },
        new MealIngredient { Name = "Salt", Category = "Seasoning", Meals = new List<Meal>() },
        new MealIngredient { Name = "Pepper", Category = "Seasoning", Meals = new List<Meal>() }
    };

    await context.MealIngredients.AddRangeAsync(ingredients);
    await context.SaveChangesAsync();

    // Create some meals and associate them with ingredients
    var meals = new List<Meal>
    {
        new Meal
        {
            Name = "Chicken Rice",
            Ingredients = new List<MealIngredient>
            {
                ingredients[0], // Chicken
                ingredients[1], // Rice
                ingredients[5], // Olive Oil
                ingredients[6], // Salt
                ingredients[7]  // Pepper
            }
        },
        new Meal
        {
            Name = "Tomato Rice",
            Ingredients = new List<MealIngredient>
            {
                ingredients[1], // Rice
                ingredients[2], // Tomato
                ingredients[3], // Onion
                ingredients[4], // Garlic
                ingredients[5], // Olive Oil
                ingredients[6], // Salt
                ingredients[7]  // Pepper
            }
        }
    };

    await context.Meals.AddRangeAsync(meals);
    await context.SaveChangesAsync();

    // Associate meals with ingredients
    foreach (var meal in meals)
    {
        foreach (var ingredient in meal.Ingredients)
        {
            ingredient.Meals.Add(meal);
        }
    }

    await context.SaveChangesAsync();
}   }
    }
}