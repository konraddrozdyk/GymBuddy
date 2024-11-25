namespace GymBuddyApi.Models
{
    public class TrainingSession
    {
        public int Id { get; set; }
        public List<Exercise> Exercises { get; set; }
    }
}