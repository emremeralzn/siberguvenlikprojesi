// Application/Services/EducationService.cs
using Cyberapp.Application.DTOs;
using Cyberapp.Application.Interfaces;
using Cyberapp.Domain.Entities;
using Cyberapp.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cyberapp.Application.Services
{
    public class EducationService : IEducationService
    {
        private readonly ApplicationDbContext _context;

        public EducationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddEducationContentAsync(EducationContentDto educationContentDto)
        {
            var content = new EducationContent
            {
                Title = educationContentDto.Title,
                Content = educationContentDto.Content,
                PublishedOn = educationContentDto.PublishedOn
            };

            _context.EducationContents.Add(content);
            await _context.SaveChangesAsync();
        }

        public async Task<List<EducationContentDto>> GetAllEducationContentsAsync()
        {
            return await _context.EducationContents
                .Select(content => new EducationContentDto
                {
                    Title = content.Title,
                    Content = content.Content,
                    PublishedOn = content.PublishedOn
                })
                .ToListAsync();
        }
    }
}
