using Backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/admin/stats")]
    public class AdminStatsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminStatsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetStats()
        {
            var stats = new
            {
                userCount = _context.Users.Count(),
                videoCount = _context.Videos.Count(),
                surveyCount = _context.Surveys.Count(),
                contactCount = _context.ContactMessages.Count(),
                unreadContactCount = _context.ContactMessages.Count(x => !x.IsRead)
            };

            return Ok(stats);
        }
    }
}
