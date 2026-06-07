using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/survey")]
    public class SurveyController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SurveyController(AppDbContext context)
        {
            _context = context;
        }

        // 🌍 Aktif anketi getir
        [HttpGet("active")]
        public IActionResult GetActiveSurvey()
        {
            var survey = _context.Surveys
                .Where(x => x.IsActive)
                .Select(x => new
                {
                    x.Id,
                    x.Question,
                    Options = x.Options.Select(o => new
                    {
                        o.Id,
                        o.Text
                    })
                })
                .FirstOrDefault();

            if (survey == null)
                return NotFound("Aktif anket yok");

            return Ok(survey);
        }

        // 🗳️ Oy ver
        [Authorize]
        [HttpPost("vote/{optionId}")]
        public IActionResult Vote(int optionId)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var option = _context.SurveyOptions.FirstOrDefault(x => x.Id == optionId);
            if (option == null)
                return NotFound();

            var alreadyVoted = _context.SurveyVotes
                .Any(x => x.SurveyId == option.SurveyId && x.UserId == userId);

            if (alreadyVoted)
                return BadRequest("Zaten oy verdin");

            option.VoteCount++;

            _context.SurveyVotes.Add(new SurveyVote
            {
                SurveyId = option.SurveyId,
                UserId = userId
            });

            _context.SaveChanges();
            return Ok("Oy alındı");
        }

        // 🔒 Admin – anket oluştur
        [Authorize(Roles = "Admin")]
        [HttpPost("create")]
        public IActionResult CreateSurvey(string question, List<string> options)
        {
            var survey = new Survey
            {
                Question = question,
                IsActive = true,
                Options = options.Select(o => new SurveyOption
                {
                    Text = o
                }).ToList()
            };

            // Eski anketleri pasif yap
            var actives = _context.Surveys.Where(x => x.IsActive).ToList();
            foreach (var s in actives)
                s.IsActive = false;

            _context.Surveys.Add(survey);
            _context.SaveChanges();

            return Ok(new
                {
                    survey.Id,
                    survey.Question,
                    Options = survey.Options.Select(o => new
                    {
                        o.Id,
                        o.Text
                    })
                });
        }

        // 🔒 Admin – sonuçlar
        [Authorize(Roles = "Admin")]
        [HttpGet("results")]
        public IActionResult Results()
        {
            var survey = _context.Surveys
                .Where(x => x.IsActive)
                .Select(x => new
                {
                    x.Question,
                    Results = x.Options.Select(o => new
                    {
                        o.Text,
                        o.VoteCount
                    })
                })
                .FirstOrDefault();

            return Ok(survey);
        }

        // 📝 Ölçek yanıtlarını kaydet
        [Authorize]
        [HttpPost("scale-response")]
        public IActionResult SaveScaleResponse([FromBody] SaveScaleResponseDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var response = new ScaleResponse
            {
                UserId = userId,
                ScaleId = dto.ScaleId,
                ResponseData = System.Text.Json.JsonSerializer.Serialize(dto.Responses),
                CreatedAt = DateTime.Now
            };

            _context.ScaleResponses.Add(response);
            _context.SaveChanges();

            return Ok(new { message = "Yanıtlar kaydedildi", id = response.Id });
        }

        // 📊 Ölçek sonuçlarını getir (Admin)
        [Authorize(Roles = "Admin")]
        [HttpGet("scale-results/{scaleId}")]
        public IActionResult GetScaleResults(string scaleId)
        {
            var responses = _context.ScaleResponses
                .Where(x => x.ScaleId == scaleId)
                .Include(x => x.User)
                .Select(x => new
                {
                    x.Id,
                    UserName = $"{x.User!.FirstName} {x.User.LastName}",
                    x.CreatedAt,
                    Responses = x.ResponseData
                })
                .ToList();

            return Ok(responses);
        }
    }

    public class SaveScaleResponseDto
    {
        public string ScaleId { get; set; } = string.Empty;
        public Dictionary<int, int> Responses { get; set; } = new();
    }
}
