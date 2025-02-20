// Controllers/EducationContentController.cs
using Cyberapp.Application.DTOs;
using Cyberapp.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Cyberapp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationContentController : BaseApiController
    {
        private readonly IEducationService _educationService;

        public EducationContentController(IEducationService educationService)
        {
            _educationService = educationService;
        }

        [HttpPost]
        public async Task<IActionResult> AddEducationContent([FromBody] EducationContentDto educationContentDto)
        {
            await _educationService.AddEducationContentAsync(educationContentDto);
            return Ok("Education content added successfully.");
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEducationContents()
        {
            var contents = await _educationService.GetAllEducationContentsAsync();
            return Ok(contents);
        }
    }
}
