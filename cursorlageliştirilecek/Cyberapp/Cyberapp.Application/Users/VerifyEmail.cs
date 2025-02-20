using Cyberapp.Application.Interfaces;
using Cyberapp.Domain.Entities;
using Cyberapp.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cyberapp.Application.Users
{
    public class VerifyEmail
    {
        public class Command : IRequest<Result>
        {
            public string Email { get; set; } = string.Empty;
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
                // Kullanıcıyı kontrol et
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

                if (user == null)
                {
                    return new Result
                    {
                        Success = false,
                        Message = "Kullanıcı bulunamadı."
                    };
                }

                // Doğrulama kodu oluştur
                var verificationCode = Guid.NewGuid().ToString().Substring(0, 6);
                user.VerificationCode = verificationCode;
                _context.Users.Update(user);
                await _context.SaveChangesAsync(cancellationToken);

                // E-posta gönder
                var subject = "E-posta Doğrulama Kodu";
                var body = $"Merhaba, doğrulama kodunuz: {verificationCode}";
                await _emailService.SendEmailAsync(user.Email, subject, body);

                return new Result
                {
                    Success = true,
                    Message = "Doğrulama kodu gönderildi."
                };
            }
        }
    }
}
