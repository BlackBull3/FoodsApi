namespace FoodsApi.Models
{
    public class Meal
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required List<MealIngredient> Ingredients { get; set; }

        // Navigation property for Orders
        public List<Order> Orders { get; set; } = new List<Order>();
    }
}