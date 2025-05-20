using System.ComponentModel.DataAnnotations;

namespace MovieWatchlist.API.Models
{
    public class WatchlistItem
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        public int MovieId { get; set; }

        [Required]
        public string MovieTitle { get; set; }

        public string? PosterUrl { get; set; }

        public DateTime AddedAt { get; set; } = DateTime.UtcNow;

        public bool Watched { get; set; } = false;

        public int? Rating { get; set; }

        public string? Review { get; set; }
    }
} 