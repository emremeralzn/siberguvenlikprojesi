using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    [HttpPost("send")]
    public async Task<IActionResult> SendEmail([FromBody] ContactRequest request)
    {
        try
        {
            // Gmail SMTP ayarları
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("pelinsy66@gmail.com", "toae wuhw touh hwbz"), // Gmail App Password buraya gelecek
                EnableSsl = true,
                UseDefaultCredentials = false // Bu satırı ekledik
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("pelinsy66@gmail.com"), // Gmail hesabınız
                Subject = $"İletişim Formu: {request.Name}",
                Body = $"Gönderen Adı: {request.Name}\nGönderen E-posta: {request.Email}\n\nMesaj:\n{request.Message}",
                IsBodyHtml = false,
            };
            mailMessage.To.Add("pelinsy66@gmail.com");

            await smtpClient.SendMailAsync(mailMessage);
            return Ok(new { message = "E-posta başarıyla gönderildi" });
        }
        catch (Exception ex)
        {
            // Hata detayını loglayalım
            Console.WriteLine($"Mail gönderme hatası: {ex.Message}");
            return StatusCode(500, new { message = "E-posta gönderilirken bir hata oluştu", error = ex.Message });
        }
    }
}

public class ContactRequest
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Message { get; set; }
    public string To { get; set; }
}