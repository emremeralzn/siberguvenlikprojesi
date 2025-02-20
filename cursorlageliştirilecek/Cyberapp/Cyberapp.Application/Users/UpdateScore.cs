using MediatR;
using Cyberapp.Domain.Entities;
using Cyberapp.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Cyberapp.Application.Users
{
    public class UpdateScore
    {
        public class Command : IRequest<User>
        {
            public int UserId { get; set; }
            public int NewScore { get; set; }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FindAsync(request.UserId);

                if (user == null)
                    throw new Exception("Kullanıcı bulunamadı");

                user.Score = request.NewScore;

                await _context.SaveChangesAsync();

                return user;
            }
        }
    }
}