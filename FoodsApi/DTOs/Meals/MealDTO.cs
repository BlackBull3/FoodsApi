using System.ComponentModel.DataAnnotations;
using FoodsApi.DTOs.Ingredients;

namespace FoodsApi.DTOs.Meals
{
    public class MealCreateDTO
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = null!;

        public List<int> IngredientIds { get; set; } = new(); // Used for creating/updating meals
    }

    public class MealResponseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public List<IngredientResponseDTO> Ingredients { get; set; } = new(); // Ingredients included in the response
    }

    public class MealUpdateDTO : MealCreateDTO
    {
        public int Id { get; set; }
    }
}