using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cyberapp.Domain;
using Cyberapp.Persistence;
using Microsoft.EntityFrameworkCore;
using Cyberapp.Domain.Entities;
using MediatR;

namespace Cyberapp.Application.Users
{
    public class Detail
    {
        public class Query : IRequest<User>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly ApplicationDbContext _context;
            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }
            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FindAsync(request.Id);
                if (user == null)
                {
                    throw new KeyNotFoundException($"ID'si {request.Id} olan kullanıcı bulunamadı.");
                }
                return user;
            }

        }
    }
}