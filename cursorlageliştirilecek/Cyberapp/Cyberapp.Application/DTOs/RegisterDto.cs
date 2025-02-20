namespace Cyberapp.Application.DTOs
{
    public class RegisterDto
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string VerificationCode { get; set; } = string.Empty;  // Kullanıcının girdiği doğrulama kodu
        public DateTime? VerificationTimestamp { get; set; } // Doğrulama zamanı

    }
}
