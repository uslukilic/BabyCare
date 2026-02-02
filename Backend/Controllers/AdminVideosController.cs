using Backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/admin/videos")]
    [Authorize(Roles = "Admin")]
    public class AdminVideosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminVideosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("stats")]
        public IActionResult Stats()
        {
            var videos = _context.Videos
                .Select(v => new
                {
                    v.Id,
                    v.Title,
                    v.ViewCount,
                    v.CreatedAt
                })
                .OrderByDescending(v => v.ViewCount)
                .ToList();

            return Ok(new
            {
                totalVideos = videos.Count,
                totalViews = videos.Sum(x => x.ViewCount),
                videos
            });
        }
    }
}
