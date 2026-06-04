namespace Backend.Models
{
    public class ScaleResponse
    {
        public int Id { get; set; }
        
        public int UserId { get; set; }
        public User? User { get; set; }
        
        public string ScaleId { get; set; } = string.Empty;  // postpartum, vas, edinburgh, etc.
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        // JSON format: { "0": 1, "1": 2, "2": 0, ... }
        public string ResponseData { get; set; } = string.Empty;
    }
}
