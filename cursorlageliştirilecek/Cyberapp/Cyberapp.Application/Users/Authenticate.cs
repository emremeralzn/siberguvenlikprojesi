using Cyberapp.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Cyberapp.Persistence;

namespace Cyberapp.Application.Users
{
    public class Authenticate
    {
        public class Query : IRequest<User?>
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        public class Handler : IRequestHandler<Query, User?>
        {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<User?> Handle(Query request, CancellationToken cancellationToken)
            {
                // Kullanıcıyı e-posta ve şifreye göre arama
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == request.Email && u.Password == request.Password, cancellationToken);

                Console.WriteLine("Kullanıcı Email: " + request.Email);
                Console.WriteLine("Kullanıcı Şifre: " + request.Password);

                // Kullanıcı bulunamadıysa null döndür
                if (user == null)
                {
                    Console.WriteLine("Kullanıcı bulunamadı veya e-posta/şifre yanlış.");
                    return null;
                }

                // Kullanıcının doğrulanmış olup olmadığını kontrol et
                if (!user.IsVerified)
                {
                    Console.WriteLine("Kullanıcı doğrulanmamış. Lütfen e-posta adresinizi doğrulayın.");
                    return null; // Doğrulanmamış kullanıcı için yetkilendirme başarısız
                }

                // Eşleşme ve doğrulama başarılıysa kullanıcıyı döndür
                Console.WriteLine("Kullanıcı başarıyla doğrulandı: " + user.Email);
                return user;
            }
        }
    }
}
