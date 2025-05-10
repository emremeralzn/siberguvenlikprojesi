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

public class AddTestLog
{
    public class Command : IRequest<Unit>
    {
        public int UserId { get; set; }
        public string TestName { get; set; } = string.Empty;
        public bool IsSuccessful { get; set; }
        public DateTime AttemptedOn { get; set; }
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
            var testLog = new TestLog
            {
                UserId = request.UserId,
                TestName = request.TestName,
                IsSuccessful = request.IsSuccessful,
                AttemptedOn = request.AttemptedOn
            };

            _context.TestLogs.Add(testLog);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
