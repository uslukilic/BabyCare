namespace Backend.Models
{
    public class SurveyVote
    {
        public int Id { get; set; }

        public int SurveyId { get; set; }
        public int UserId { get; set; }
    }
}
