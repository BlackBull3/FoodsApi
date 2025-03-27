namespace FoodsApi.DTOs.Auth
{
    public class RegisterDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginResponseDTO
    {
        public string Token { get; set; }
        public string Email { get; set; }
    }

     public class ForgotPasswordDTO
    {
        public string Email { get; set; }
    }

     public class ResetPasswordDTO
    {
        public string Email { get; set; }
        public string Code { get; set; }
        public string NewPassword { get; set; }
    }

    public class ChangePasswordDTO
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
    
     public class VerifyEmailDTO
    {
        public string Email { get; set; }
        public string Code { get; set; }
    }


  public class VerificationResponseDTO
    {
        public string Email { get; set; }
        public string VerificationCode { get; set; }
    }

    public class ResetPasswordResponseDTO
    {
        public string Email { get; set; }
        public string ResetCode { get; set; }
    }

// Add this to AuthDTO.cs
public class EmailOnlyDTO
{
    public string Email { get; set; }
}
 public class ValidateTokenResponseDTO
    {
        public bool IsValid { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}