namespace Cyberapp.Application.Dto
{
    public class SimulationLogDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string SimulationName { get; set; } = string.Empty;
        public bool IsSuccessful { get; set; }
        public DateTime AttemptedOn { get; set; }
    }
}
