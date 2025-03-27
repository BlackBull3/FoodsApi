using System.ComponentModel.DataAnnotations;
using FoodsApi.DTOs.Meals;

namespace FoodsApi.DTOs.Orders{

public class OrderCreateDTO
{
    [Required]
    public int MealId { get; set; }
}

public class OrderResponseDTO
{
    public int Id { get; set; }
    public MealResponseDTO Meal { get; set; } = null!;
    public string Status { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
}
 public class UpdateStatusDTO
    {
        public string Status { get; set; } = null!;
    }
}