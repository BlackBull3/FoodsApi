using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using FoodsApi.Data;
using FoodsApi.DTOs.Auth;
using FoodsApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace FoodsApi.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/auth")]
    public class AuthController : ControllerBase
    {
        private readonly RestaurantContext _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthController(
            RestaurantContext context,
            IMapper mapper,
            IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
        }

        // Register a new user (public endpoint)
        [HttpPost("register")]
        public async Task<ActionResult<VerificationResponseDTO>> Register([FromBody] RegisterDTO dto)
        {
            // Check if the email is already registered
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return BadRequest("Email is already registered.");
            }

            // Hash the password
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            // Generate a verification code
            var verificationCode = GenerateVerificationCode();

            // Find the default role (e.g., "Client")
            var defaultRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Client");
            if (defaultRole == null)
            {
                return BadRequest("Default role not found.");
            }

            // Create a new user
            var user = new User
            {
                Email = dto.Email,
                PasswordHash = passwordHash,
                VerificationCode = verificationCode,
                IsVerified = false,
                RoleId = defaultRole.Id // Assign the default role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Return the verification code to the frontend
            return Ok(new VerificationResponseDTO
            {
                Email = user.Email,
                VerificationCode = verificationCode
            });
        }

        // Admin-only endpoint: Register a new Chef user
        [HttpPost("register-chef")]
        [Authorize(Roles = "Admin")] // Only Admin can access this endpoint
        public async Task<ActionResult<VerificationResponseDTO>> RegisterChef([FromBody] RegisterDTO dto)
        {
            // Check if the email is already registered
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return BadRequest("Email is already registered.");
            }

            // Hash the password
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            // Generate a verification code
            var verificationCode = GenerateVerificationCode();

            // Find the Chef role
            var chefRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Chef");
            if (chefRole == null)
            {
                return BadRequest("Chef role not found.");
            }

            // Create a new Chef user
            var chefUser = new User
            {
                Email = dto.Email,
                PasswordHash = passwordHash,
                VerificationCode = verificationCode,
                IsVerified = true, // Automatically verify Chef users
                RoleId = chefRole.Id // Assign the Chef role
            };

            _context.Users.Add(chefUser);
            await _context.SaveChangesAsync();

            // Return the verification code to the frontend
            return Ok(new VerificationResponseDTO
            {
                Email = chefUser.Email,
                VerificationCode = verificationCode
            });
        }

        // Admin-only endpoint: Register a new Admin user
        [HttpPost("register-admin")]
        [Authorize(Roles = "Admin")] // Only Admin can access this endpoint
        public async Task<ActionResult<VerificationResponseDTO>> RegisterAdmin([FromBody] RegisterDTO dto)
        {
            // Check if the email is already registered
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return BadRequest("Email is already registered.");
            }

            // Hash the password
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            // Generate a verification code
            var verificationCode = GenerateVerificationCode();

            // Find the Admin role
            var adminRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Admin");
            if (adminRole == null)
            {
                return BadRequest("Admin role not found.");
            }

            // Create a new Admin user
            var adminUser = new User
            {
                Email = dto.Email,
                PasswordHash = passwordHash,
                VerificationCode = verificationCode,
                IsVerified = true, // Automatically verify Admin users
                RoleId = adminRole.Id // Assign the Admin role
            };

            _context.Users.Add(adminUser);
            await _context.SaveChangesAsync();

            // Return the verification code to the frontend
            return Ok(new VerificationResponseDTO
            {
                Email = adminUser.Email,
                VerificationCode = verificationCode
            });
        }

        // Login
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDTO>> Login([FromBody] LoginDTO dto)
        {
            var user = await _context.Users
                .Include(u => u.Role) // Include the Role in the query
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid email or password.");
            }

            if (!user.IsVerified)
            {
                return BadRequest("Please verify your email first.");
            }

            // Generate JWT token
            var token = GenerateJwtToken(user);

            return Ok(new LoginResponseDTO
            {
                Token = token,
                Email = user.Email,
            });
        }

        // Forgot password
        [HttpPost("forgot-password")]
        public async Task<ActionResult<ResetPasswordResponseDTO>> ForgotPassword([FromBody] ForgotPasswordDTO dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Generate a reset code
            var resetCode = GenerateVerificationCode();
            user.ResetPasswordCode = resetCode;
            await _context.SaveChangesAsync();

            // Return the reset code to the frontend
            return Ok(new ResetPasswordResponseDTO
            {
                Email = user.Email,
                ResetCode = resetCode
            });
        }

        // Reset password
        [HttpPost("reset-password")]
        public async Task<ActionResult> ResetPassword([FromBody] ResetPasswordDTO dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email && u.ResetPasswordCode == dto.Code);

            if (user == null)
            {
                return BadRequest("Invalid email or code.");
            }

            // Hash the new password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            user.ResetPasswordCode = null; // Clear the reset code
            await _context.SaveChangesAsync();

            return Ok("Password reset successfully.");
        }

        // Change password (requires authentication)
        [HttpPost("change-password")]
        [Authorize]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordDTO dto)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.PasswordHash))
            {
                return Unauthorized("Invalid credentials.");
            }

            // Hash the new password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            await _context.SaveChangesAsync();

            return Ok("Password changed successfully.");
        }

        // Verify email
        [HttpPost("verify-email")]
        public async Task<ActionResult> VerifyEmail([FromBody] VerifyEmailDTO dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email && u.VerificationCode == dto.Code);

            if (user == null)
            {
                return BadRequest("Invalid email or code.");
            }

            user.IsVerified = true;
            user.VerificationCode = null; // Clear the verification code
            await _context.SaveChangesAsync();

            return Ok("Email verified successfully.");
        }
// Resend verification code
[HttpPost("resend-verification")]
public async Task<ActionResult<VerificationResponseDTO>> ResendVerification([FromBody] EmailOnlyDTO dto)
{
    var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

    if (user == null)
    {
        return NotFound("User not found.");
    }

    if (user.IsVerified)
    {
        return BadRequest("Email is already verified.");
    }

    // Generate a new verification code
    var newVerificationCode = GenerateVerificationCode();
    user.VerificationCode = newVerificationCode;
    await _context.SaveChangesAsync();

    return Ok(new VerificationResponseDTO
    {
        Email = user.Email,
        VerificationCode = newVerificationCode
    });
}
        // Helper methods
        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.Name) // Include the role in the token
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(24),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

// Add this method to your AuthController class
[HttpGet("validate-token")]
[Authorize] // Requires a valid token to access
public ActionResult<ValidateTokenResponseDTO> ValidateToken()
{
    // If execution reaches here, the token is already validated by the [Authorize] attribute
    // We just need to return the user information from the token
    
    var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
    var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

    if (string.IsNullOrEmpty(userEmail) || string.IsNullOrEmpty(userRole))
    {
        return Unauthorized("Invalid token claims.");
    }

    return Ok(new ValidateTokenResponseDTO
    {
        IsValid = true,
        Email = userEmail,
        Role = userRole
    });
}
        private string GenerateVerificationCode()
        {
            return new Random().Next(100000, 999999).ToString();
        }

        [HttpPost("logout")]
        [Authorize] // Ensure only authenticated users can call this endpoint
        public ActionResult Logout()
        {
            // Logout is handled on the client side by discarding the token
            return Ok("Logged out successfully.");
        }
    
    
    
    // Get all users (Admin only)
[HttpGet("users")]
[Authorize(Roles = "Admin")]
public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
{
    var users = await _context.Users
        .Include(u => u.Role)
        .Select(u => new UserDTO
        {
            Email = u.Email,
            Role = u.Role.Name,
            IsVerified = u.IsVerified
        })
        .ToListAsync();

    return Ok(users);
}

// Delete user (Admin only)
[HttpDelete("users/{email}")]
[Authorize(Roles = "Admin")]
public async Task<ActionResult> DeleteUser(string email)
{
    var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    if (user == null)
    {
        return NotFound("User not found.");
    }

    _context.Users.Remove(user);
    await _context.SaveChangesAsync();

    return Ok("User deleted successfully.");
}

    
    
    }
}