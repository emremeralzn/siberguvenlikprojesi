using Cyberapp.Application.Interfaces;
using System.Net;
using System.Net.Mail;

namespace Cyberapp.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        public async Task SendEmailAsync(string to, string subject, string body)
        {
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587, // TLS portu
                    Credentials = new NetworkCredential("pelinsy66@gmail.com", "toae wuhw touh hwbz"),
                    EnableSsl = true
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("pelinsy66@gmail.com"),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true,
                };

                mailMessage.To.Add(to);

                await smtpClient.SendMailAsync(mailMessage);
            }
            catch (Exception ex)
            {
                // Hata mesajını logla veya göster
                Console.WriteLine($"E-posta gönderim hatası: {ex.Message}");
                throw;
            }
        }

    }
}
