using Backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/admin/contacts")]
    [Authorize(Roles = "Admin")]
    public class AdminContactController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminContactController(AppDbContext context)
        {
            _context = context;
        }

        // 📋 Liste
        [HttpGet]
        public IActionResult GetAll()
        {
            var messages = _context.ContactMessages
                .OrderByDescending(x => x.CreatedAt)
                .Select(x => new
                {
                    x.Id,
                    x.FirstName,
                    x.LastName,
                    x.Email,
                    x.Phone,
                    x.IsRead,
                    x.CreatedAt
                })
                .ToList();

            return Ok(messages);
        }

        // 🔍 Detay
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var message = _context.ContactMessages.FirstOrDefault(x => x.Id == id);
            if (message == null)
                return NotFound();

            message.IsRead = true;
            _context.SaveChanges();

            return Ok(message);
        }

        // 🗑️ Sil
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var message = _context.ContactMessages.FirstOrDefault(x => x.Id == id);
            if (message == null)
                return NotFound();

            _context.ContactMessages.Remove(message);
            _context.SaveChanges();

            return Ok();
        }
        [HttpPut("{id}/read")]
        public IActionResult MarkAsRead(int id)
        {
            var message = _context.ContactMessages.FirstOrDefault(x => x.Id == id);
            if (message == null)
                return NotFound();

            if (message.IsRead)
                return Ok(); // zaten okunmuşsa sorun yok

            message.IsRead = true;
            _context.SaveChanges();

            return Ok();
        }

    }
}
