using System.ComponentModel.DataAnnotations;

namespace Cyberapp.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "E-posta zorunludur.")]
        [EmailAddress(ErrorMessage = "Geçerli bir e-posta adresi giriniz.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Şifre zorunludur.")]
        [DataType(DataType.Password, ErrorMessage = "Geçerli bir şifre giriniz.")]
        public string Password { get; set; } = string.Empty;

        public int Score { get; set; }

        // Kullanıcıyla ilişkili simülasyon logları
        public bool IsVerified { get; set; } = false;
        public string? VerificationCode { get; set; }
        public DateTime? VerificationTimestamp { get; set; } // Doğrulama zamanı

        public ICollection<SimulationLog> SimulationLogs { get; set; } = new List<SimulationLog>();

        // Skor güncelleme metodu
        public void UpdateScore(int newScore)
        {
            Score = newScore;
        }
    }
}
