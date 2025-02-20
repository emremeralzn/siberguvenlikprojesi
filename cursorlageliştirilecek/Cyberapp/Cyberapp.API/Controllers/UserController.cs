using System.Collections.Generic;
using System.Threading.Tasks;
using Cyberapp.Application.Users;
using Cyberapp.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Cyberapp.Application.SimulationLogs;
namespace Cyberapp.API.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var users = await _mediator.Send(new List.Query());
            return Ok(users); // Status 200 ile döner
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _mediator.Send(new Detail.Query { Id = id });
            if (user == null) return NotFound();
            return Ok(user); // Status 200 ile döner

        }
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (user == null)
                return BadRequest("Invalid country data.");

            var result = await _mediator.Send(new Create.Command { User = user });

            if (result == Unit.Value)
            {
                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user); // Status 201 döner
            }
            return BadRequest("An error occurred while creating the user.");
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _mediator.Send(new Delete.Command { Id = id });
            if (result == Unit.Value)
            {
                return NoContent(); // Status 204 döner
            }
            return BadRequest("An error occurred while deleting the country.");
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCountry(int id, User user)
        {
            user.Id = id;
            await _mediator.Send(new Update.Command { User = user });
            return Ok();
        }
        [HttpPost("authenticate")]
        public async Task<ActionResult<User>> Authenticate([FromBody] AuthenticateDto loginUser)
        {
            var user = await _mediator.Send(new Authenticate.Query
            {
                Email = loginUser.Email,
                Password = loginUser.Password
            });
            if (user == null)
                return Unauthorized("E-posta veya şifre hatalı");

            return Ok(user);
        }

        // Kullanıcının SimulationLog'larını Getir
        [HttpGet("{userId:int}/simulationLogs")]
        public async Task<IActionResult> GetUserSimulationLogs(int userId)
        {
            var logs = await _mediator.Send(new DetailSimulationLogs.Query { UserId = userId });
            return Ok(logs);
        }
        // Kullanıcı için Yeni SimulationLog Ekle
        [HttpPost("{userId:int}/simulationLogs")]
        public async Task<IActionResult> AddUserSimulationLog(int userId, [FromBody] AddSimulationLog.Command command)
        {
            if (userId != command.UserId)
                return BadRequest("UserId in the path does not match the body.");

            await _mediator.Send(command);
            return Ok();
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Register.Command registerDto)
        {
            var result = await _mediator.Send(registerDto);

            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            return Ok(new { message = result.Message });
        }


        [HttpPost("send-verification-code")]
        public async Task<IActionResult> SendVerificationCode([FromBody] VerifyEmail.Command command)
        {
            try
            {
                // Mediator aracılığıyla doğrulama işlemini başlatıyoruz
                var result = await _mediator.Send(command);

                if (!result.Success)
                    return BadRequest(result.Message);

                return Ok(result.Message); // Başarılı mesajı döndürüyoruz
            }
            catch (Exception ex)
            {
                // Hata durumunda genel bir mesaj döndürülür
                return StatusCode(500, $"E-posta gönderiminde bir hata oluştu: {ex.Message}");
            }
        }
        [HttpPost("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromBody] ValidateVerificationCode.Command command)
        {
            var result = await _mediator.Send(command);
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(result.Message);
        }
        [HttpPost("{userId:int}/updateScore")]
        public async Task<IActionResult> UpdateUserScore(int userId, [FromBody] UpdateScoreCommand command)
        {
            if (userId != command.UserId)
                return BadRequest("UserId in the path does not match the body.");

            try
            {
                var user = await _mediator.Send(new UpdateScore.Command { UserId = userId, NewScore = command.NewScore });
                if (user == null)
                    return NotFound();

                return Ok(new { user.Score });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Skor güncellenirken bir hata oluştu: {ex.Message}");
            }
        }

        public class UpdateScoreCommand
        {
            public int UserId { get; set; }
            public int NewScore { get; set; }
        }
    }
}
