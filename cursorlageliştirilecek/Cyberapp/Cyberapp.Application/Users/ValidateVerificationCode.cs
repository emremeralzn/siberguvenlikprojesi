using Cyberapp.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cyberapp.Application.Users
{
    public class ValidateVerificationCode
    {
        public class Command : IRequest<Result>
        {
            public string Email { get; set; } = string.Empty;
            public string VerificationCode { get; set; } = string.Empty;
        }

        public class Result
        {
            public bool Success { get; set; }
            public string Message { get; set; } = string.Empty;
        }

        public class Handler : IRequestHandler<Command, Result>
        {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
            {
                // Kullanıcıyı doğrulama kodu ve email ile bul
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == request.Email && u.VerificationCode == request.VerificationCode, cancellationToken);

                // Kullanıcı bulunamazsa veya doğrulama kodu geçersizse
                if (user == null || user.VerificationTimestamp == null || user.VerificationTimestamp < DateTime.UtcNow.AddMinutes(-5))
                {
                    return new Result
                    {
                        Success = false,
                        Message = "Invalid or expired verification code."
                    };
                }

                // Kullanıcıyı doğrula
                user.IsVerified = true;
                user.VerificationCode = null; // Kod temizleniyor
                _context.Users.Update(user);
                await _context.SaveChangesAsync(cancellationToken);

                return new Result
                {
                    Success = true,
                    Message = "User verified successfully."
                };
            }
        }
    }
}
