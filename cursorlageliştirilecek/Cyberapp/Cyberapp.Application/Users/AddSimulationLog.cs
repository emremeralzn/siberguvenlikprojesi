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
    public class AddSimulationLog
    {
        public class Command : IRequest<Unit>
        {
            public int UserId { get; set; } // Kullanıcı kimliği
            public string SimulationName { get; set; } = string.Empty; // Simülasyon adı
            public bool IsSuccessful { get; set; } // Başarı durumu
            public DateTime AttemptedOn { get; set; } // Deneme tarihi
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
                var simulationLog = new SimulationLog
                {
                    UserId = request.UserId,
                    SimulationName = request.SimulationName,
                    IsSuccessful = request.IsSuccessful,
                    AttemptedOn = request.AttemptedOn
                };

                _context.SimulationLogs.Add(simulationLog);
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
