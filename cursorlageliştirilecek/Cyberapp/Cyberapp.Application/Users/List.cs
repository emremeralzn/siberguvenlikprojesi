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
    public class List
    {
        public class Query : IRequest<List<User>> { }

        public class Handler : IRequestHandler<Query, List<User>>
        {
            private readonly ApplicationDbContext _context;
            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }
            public async Task<List<User>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Users.ToListAsync();
            }
        }
    }
}