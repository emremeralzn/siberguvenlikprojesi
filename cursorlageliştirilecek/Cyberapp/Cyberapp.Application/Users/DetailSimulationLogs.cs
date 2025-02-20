using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cyberapp.Domain.Entities;
using Cyberapp.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cyberapp.Application.SimulationLogs
{
    public class DetailSimulationLogs
    {
        public class Query : IRequest<List<SimulationLog>>
        {
            public int UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<SimulationLog>>
        {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<List<SimulationLog>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.SimulationLogs
                    .Where(l => l.UserId == request.UserId)
                    .ToListAsync(cancellationToken);
            }
        }
    }
}
