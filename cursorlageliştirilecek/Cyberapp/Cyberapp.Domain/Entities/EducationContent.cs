// Domain/Entities/EducationContent.cs
namespace Cyberapp.Domain.Entities;
public class EducationContent
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime PublishedOn { get; set; }
}
