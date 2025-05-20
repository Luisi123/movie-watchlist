using System.ComponentModel.DataAnnotations;

namespace MovieWatchlist.API.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<WatchlistItem> Watchlist { get; set; } = new List<WatchlistItem>();
    }
} 