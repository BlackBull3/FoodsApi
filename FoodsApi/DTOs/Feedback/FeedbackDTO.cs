using System.ComponentModel.DataAnnotations;
namespace FoodsApi.DTOs.Feedback{

public class FeedbackCreateDTO
{
    [Required]
    [StringLength(500)]
    public string Message { get; set; } = null!;
}
  public class FeedbackResponseDTO
    {
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
