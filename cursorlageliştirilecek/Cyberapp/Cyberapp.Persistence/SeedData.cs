using Cyberapp.Domain.Entities;
using Cyberapp.Persistence;

namespace Cyberapp.Persistence.Seed
{
    public static class SeedData
    {
        public static void Initialize(ApplicationDbContext context)
        {
            // Kullanıcı verileri ekleniyor
            if (!context.Users.Any())
            {
                context.Users.AddRange(
                    new User
                    {
                        Username = "znoxl",
                        Email = "znoxl7@example.com",
                        Password = "znoxlnoxlyses",
                        Score = 100
                    },
                    new User
                    {
                        Username = "Serhat Eren Atalay",
                        Email = "seatv34@example.com",
                        Password = "serhaterenatalay123",
                        Score = 200
                    }
                );
                context.SaveChanges();
            }

            // EducationContent verileri ekleniyor
            if (!context.EducationContents.Any())
            {
                context.EducationContents.AddRange(
                    new EducationContent
                    {
                        Title = "Phishing Awareness",
                        Content = "Understand the basics of phishing and how to avoid it.",
                        PublishedOn = DateTime.Now.AddDays(-10)
                    },
                    new EducationContent
                    {
                        Title = "Social Engineering Explained",
                        Content = "Learn how social engineering attacks work.",
                        PublishedOn = DateTime.Now.AddDays(-20)
                    }
                );
                context.SaveChanges();
            }


            // SimulationLog verileri ekleniyor
            if (!context.SimulationLogs.Any())
            {
                var users = context.Users.ToList();
                if (users.Any())
                {
                    context.SimulationLogs.AddRange(
                        new SimulationLog
                        {
                            UserId = users[0].Id,
                            SimulationName = "Phishing Simulation",
                            IsSuccessful = true,
                            AttemptedOn = DateTime.Now.AddDays(-2)
                        },
                        new SimulationLog
                        {
                            UserId = users[1].Id,
                            SimulationName = "Social Engineering Simulation",
                            IsSuccessful = false,
                            AttemptedOn = DateTime.Now.AddDays(-1)
                        }
                    );
                    context.SaveChanges();
                }
            }
        }
    }
}
