namespace FoodsApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string? VerificationCode { get; set; }
        public bool IsVerified { get; set; }
        public string? ResetPasswordCode { get; set; }

        // Foreign key to Role
        public int RoleId { get; set; }

        // Navigation property to Role
        public Role Role { get; set; }
    }
}