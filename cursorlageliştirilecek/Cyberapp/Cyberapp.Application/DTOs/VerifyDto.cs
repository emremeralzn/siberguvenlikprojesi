namespace Cyberapp.Application.DTOs
{
    public class VerifyDto
    {
        public string Email { get; set; } = string.Empty;
        public string VerificationCode { get; set; } = string.Empty;
    }
}