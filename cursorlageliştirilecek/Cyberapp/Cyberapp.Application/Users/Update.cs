using System;
using System.Threading;
using System.Threading.Tasks;
using Cyberapp.Domain.Entities;
using Cyberapp.Persistence;
using MediatR;

namespace Cyberapp.Application.Users
{
    public class Update
    {
        public class Command : IRequest
        {
            public required User User { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                // İlgili ülkeyi bul
                var user = await _context.Users.FindAsync(request.User.Id);

                if (user == null)
                {
                    throw new Exception("User not found");
                }

                // Verileri güncelle
                user.Username = request.User.Username;
                user.Email = request.User.Email;

                await _context.SaveChangesAsync();

            }
        }
    }
}
