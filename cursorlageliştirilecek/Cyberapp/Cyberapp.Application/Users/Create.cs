using System;
using System.Threading;
using System.Threading.Tasks;
using Cyberapp.Domain.Entities;
using Cyberapp.Persistence;
using MediatR;

namespace Cyberapp.Application.Users
{
    public class Create
    {
        public class Command : IRequest<Unit>
        {
            public required User User { get; set; } // User özelliği zorunlu
        }

        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Users.Add(request.User);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success)
                {
                    return Unit.Value; // İşlem başarıyla tamamlandı
                }

                throw new Exception("Kullanıcı oluşturulurken bir hata oluştu.");
            }
        }
    }
}
