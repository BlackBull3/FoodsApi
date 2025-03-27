// Models/Feedback.cs
namespace FoodsApi.Models
{
    public class Feedback
    {
        public int Id { get; set; }
        public required string Message { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}