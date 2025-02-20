// Application/Interfaces/IEducationService.cs
using Cyberapp.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cyberapp.Application.Interfaces
{
    public interface IEducationService
    {
        Task AddEducationContentAsync(EducationContentDto educationContentDto);
        Task<List<EducationContentDto>> GetAllEducationContentsAsync();
    }
}
