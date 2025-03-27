namespace FoodsApi.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; } // e.g., "Admin", "Chef", "Client"

        // Navigation property for one-to-many relationship with User
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}