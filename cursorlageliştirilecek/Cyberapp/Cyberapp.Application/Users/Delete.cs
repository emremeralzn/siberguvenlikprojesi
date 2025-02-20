using System;
using System.Threading;
using System.Threading.Tasks;
using Cyberapp.Domain.Entities;
using Cyberapp.Persistence;
using MediatR;

namespace Cyberapp.Application.Users
{
    public class Delete
    {
        public class Command : IRequest<Unit>
        {
            public int Id { get; set; }
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
                var activity = await _context.Users.FindAsync(request.Id);

                if (activity == null)
                {
                    throw new Exception("Activity not found");
                }

                _context.Remove(activity);
                await _context.SaveChangesAsync();

                return Unit.Value; // İşlem başarıyla tamamlandı
            }
        }
    }

}