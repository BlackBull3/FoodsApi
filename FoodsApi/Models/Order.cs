using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FoodsApi.Models
{
    public class Order
    {
        public int Id { get; set; }

        // Explicitly define the foreign key property
        [ForeignKey("Meal")]
        public int MealId { get; set; } // Foreign key to Meal

        public string Status { get; set; } = "Pending";  // Pending/Preparing/Completed
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property for Meal
        [JsonIgnore] // Optional: Prevents circular reference in JSON serialization
        public Meal Meal { get; set; }
    }
}