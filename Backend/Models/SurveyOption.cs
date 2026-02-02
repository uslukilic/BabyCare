namespace Backend.Models
{
    public class SurveyOption
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;

        public int SurveyId { get; set; }
        public Survey Survey { get; set; } = null!;

        public int VoteCount { get; set; } = 0;
    }
}
