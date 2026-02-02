using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Backend.DTOs;
namespace Backend.Controllers
{
    [ApiController]
    [Route("api/videos")]
    public class VideoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public VideoController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // 🔒 Admin video yükler
        [Authorize(Roles = "Admin")]
        [HttpPost("upload")]
        public IActionResult Upload([FromForm] VideoUploadDto dto)
        {
            if (dto.File == null || dto.File.Length == 0)
                return BadRequest("Dosya yok");

            var videosPath = Path.Combine(_env.WebRootPath, "videos");

            if (!Directory.Exists(videosPath))
                Directory.CreateDirectory(videosPath);

            var fileName = Guid.NewGuid() + Path.GetExtension(dto.File.FileName);
            var filePath = Path.Combine(videosPath, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            dto.File.CopyTo(stream);

            var video = new Video
            {
                Title = dto.Title,
                Description = dto.Description,
                FileName = fileName
            };

            _context.Videos.Add(video);
            _context.SaveChanges();

            return Ok(video);
        }
        // ❌❌❌ Video silme (ADMIN)
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var video = _context.Videos.FirstOrDefault(v => v.Id == id);
            if (video == null)
                return NotFound();

            var videoPath = Path.Combine(_env.WebRootPath, "videos", video.FileName);

            if (System.IO.File.Exists(videoPath))
                System.IO.File.Delete(videoPath);

            _context.Videos.Remove(video);
            _context.SaveChanges();

            return Ok();
        }



        // 🌍 Herkes videoları görür
        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Videos.ToList());
        }

        // ▶️ Video izleme
        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult Watch(int id)
        {
            var video = _context.Videos.FirstOrDefault(x => x.Id == id);
            if (video == null)
                return NotFound();

            video.ViewCount++;
            _context.SaveChanges();

            var videoUrl = $"{Request.Scheme}://{Request.Host}/videos/{video.FileName}";

            return Ok(new
            {
                video.Id,
                video.Title,
                video.Description,
                video.ViewCount,
                videoUrl
            });
        }
    }
}
