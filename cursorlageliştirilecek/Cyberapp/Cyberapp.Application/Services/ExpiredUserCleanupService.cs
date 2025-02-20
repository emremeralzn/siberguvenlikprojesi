using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cyberapp.Persistence;
using Microsoft.Extensions.DependencyInjection;


namespace Cyberapp.Application.Services
{
    public class ExpiredUserCleanupService : IHostedService
    {
        private readonly IServiceProvider _serviceProvider;
        private Timer? _timer;

        public ExpiredUserCleanupService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            // Timer 5 dakikada bir çalışacak şekilde ayarlanır.
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromMinutes(5));
            return Task.CompletedTask;
        }

        private async void DoWork(object? state)
        {
            // Yeni bir scope oluştur
            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            var expiredUsers = dbContext.Users
                .Where(user => user.VerificationTimestamp != null &&
                               user.IsVerified == false &&
                               user.VerificationTimestamp.Value.AddMinutes(5) < DateTime.UtcNow)
                .ToList();

            if (expiredUsers.Any())
            {
                dbContext.Users.RemoveRange(expiredUsers);
                await dbContext.SaveChangesAsync();
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }
    }
}
