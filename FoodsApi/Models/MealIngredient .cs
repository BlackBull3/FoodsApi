namespace FoodsApi.Models
{
    public class MealIngredient
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Category { get; set; }
        public required List<Meal> Meals { get; set; }
    }
}