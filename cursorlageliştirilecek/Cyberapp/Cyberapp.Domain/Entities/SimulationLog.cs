// Domain/Entities/SimulationLog.cs
namespace Cyberapp.Domain.Entities;
public class SimulationLog
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string SimulationName { get; set; } = string.Empty;
    public bool IsSuccessful { get; set; }
    public DateTime AttemptedOn { get; set; }
    public User? User { get; set; }
}
