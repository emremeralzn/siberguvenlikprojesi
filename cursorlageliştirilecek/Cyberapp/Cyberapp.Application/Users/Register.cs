using Cyberapp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Cyberapp.Persistence;
using MediatR;
using Cyberapp.Application.Interfaces;

namespace Cyberapp.Application.Users
{
    public class Register
    {
        public class Command : IRequest<Result>
        {
            public string Username { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        public class Result
        {
            public bool Success { get; set; }
            public string Message { get; set; } = string.Empty;
        }

        public class Handler : IRequestHandler<Command, Result>
        {
            private readonly ApplicationDbContext _context;
            private readonly IEmailService _emailService;

            public Handler(ApplicationDbContext context, IEmailService emailService)
            {
                _context = context;
                _emailService = emailService;
            }

            public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
            {
                // E-posta kontrolü
                var existingUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

                if (existingUser != null)
                {
                    return new Result
                    {
                        Success = false,
                        Message = "Bu e-posta adresi zaten kayıtlı."
                    };
                }

                // Yeni kullanıcı oluşturma işlemi (şifreyi hash'lemeden düz kaydediyoruz)
                var newUser = new User
                {
                    Username = request.Username,
                    Email = request.Email,
                    Password = request.Password, // Şifreyi hash'lemeden düz kaydediyoruz
                    Score = 100, // Varsayılan olarak 100 puan
                    IsVerified = false, // Başlangıçta doğrulama yapılmamış olarak ayarlandı
                    VerificationTimestamp = DateTime.UtcNow // Kullanıcının doğrulama süresi başlıyor

                };

                // Doğrulama kodu oluştur
                var verificationCode = Guid.NewGuid().ToString().Substring(0, 6);
                newUser.VerificationCode = verificationCode;

                // Kullanıcıyı veritabanına kaydetmeden önce doğrulama kodunu gönderiyoruz
                _context.Users.Add(newUser);
                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success)
                {
                    // E-posta gönder
                    var subject = "E-posta Doğrulama Kodu";
                    var body = $"Merhaba, doğrulama kodunuz: {verificationCode}";
                    await _emailService.SendEmailAsync(newUser.Email, subject, body);

                    return new Result
                    {
                        Success = true,
                        Message = "Kayıt işlemi başlatıldı, lütfen e-posta adresinize gelen doğrulama kodunu girin."
                    };
                }

                throw new Exception("Kullanıcı oluşturulurken bir hata oluştu.");
            }
        }
    }


}
