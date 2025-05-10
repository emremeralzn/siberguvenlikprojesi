namespace Cyberapp.Domain.Entities;
public class TestLog
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string TestName { get; set; } = string.Empty;
    public bool IsSuccessful { get; set; }
    public DateTime AttemptedOn { get; set; }
    public User? User { get; set; }
}
