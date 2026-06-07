using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;

        public ChatController(ChatService chatService)
        {
            _chatService = chatService;
        }
        public class ChatRequest
        {
            public string Question { get; set; } = string.Empty;
        }

        public class ChatResponse
        {
            public string Answer { get; set; } = string.Empty;
        }

        [HttpPost]
        public IActionResult Chat([FromBody] ChatRequest request)
        {
            var question = request.Question?.Trim() ?? string.Empty;
            if (string.IsNullOrWhiteSpace(question))
            {
                return BadRequest(new ChatResponse { Answer = "Lütfen bir soru yazın." });
            }

            var answer = _chatService.GetResponse(question);
            return Ok(new ChatResponse { Answer = answer });
        }
    }
}
