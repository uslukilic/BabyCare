using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/contact")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Send(ContactMessageDto dto)
        {
            var message = new ContactMessage
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Phone = dto.Phone,
                BabyAge = dto.BabyAge,
                Message = dto.Message,
                IsRead = false
            };

            _context.ContactMessages.Add(message);
            _context.SaveChanges();

            return Ok("Mesaj alındı");
        }
    }
}
