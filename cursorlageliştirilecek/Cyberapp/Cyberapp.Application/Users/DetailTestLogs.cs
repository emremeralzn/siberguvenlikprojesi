using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cyberapp.Domain;
using Cyberapp.Persistence;
using Microsoft.EntityFrameworkCore;
using Cyberapp.Domain.Entities;
using MediatR;
namespace Cyberapp.Application.Users;

public class DetailTestLogs
{
    public class Query : IRequest<List<TestLog>>
    {
        public int UserId { get; set; }
    }

    public class Handler : IRequestHandler<Query, List<TestLog>>
    {
        private readonly ApplicationDbContext _context;

        public Handler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TestLog>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.TestLogs
                .Where(l => l.UserId == request.UserId)
                .ToListAsync(cancellationToken);
        }
    }
}
