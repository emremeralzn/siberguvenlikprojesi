using System.Collections.Generic;
using System.Threading.Tasks;
using Cyberapp.Application.Users;
using Cyberapp.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
namespace Cyberapp.API.Controllers
{
    [Route("api/education")]

    public class EducationController : BaseApiController
    {
        [HttpGet]
        public IActionResult GetEducationContent()
        {
            // Bu endpoint örneğin JSON formatında eğitim içeriği döndürür.
            return Ok(new { Title = "Phishing Nedir?", Content = "Phishing, kullanıcıları kandırmak için..." });
        }
    }
}