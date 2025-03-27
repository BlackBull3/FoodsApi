using System.ComponentModel.DataAnnotations;
namespace FoodsApi.DTOs.Ingredients
{
public class IngredientCreateDTO
{
    [Required][StringLength(50)]
    public string Name { get; set; } = null!;

    [Required][StringLength(30)]
    public string Category { get; set; } = null!;
}


 public class IngredientUpdateDTO : IngredientCreateDTO
{
    public int Id { get; set; }
}

    public class IngredientResponseDTO : IngredientUpdateDTO { }


}