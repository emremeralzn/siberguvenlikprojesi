using Microsoft.EntityFrameworkCore;
using Cyberapp.Domain.Entities;

namespace Cyberapp.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<SimulationLog> SimulationLogs { get; set; } = null!;
        public DbSet<EducationContent> EducationContents { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Kullanıcıyla ilişkili simülasyon logları: User - SimulationLog
            modelBuilder.Entity<SimulationLog>()
                .HasOne(sl => sl.User)  // SimulationLog bir User'a sahip.
                .WithMany(u => u.SimulationLogs)  // User, birden fazla SimulationLog'a sahip olabilir.
                .HasForeignKey(sl => sl.UserId)  // SimulationLog tablosundaki UserId dış anahtar.
                .OnDelete(DeleteBehavior.Cascade); // User silindiğinde ilişkili tüm SimulationLog'lar da silinsin.
        }
    }
}
