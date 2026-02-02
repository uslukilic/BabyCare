namespace Backend.Models
{
    public class Survey
    {
        public int Id { get; set; }
        public string Question { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;

        public List<SurveyOption> Options { get; set; } = new();
    }
}
