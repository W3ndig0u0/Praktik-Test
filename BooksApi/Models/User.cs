
namespace BooksApi.Models
{
  public class User
  {
    public int Id { get; set; }

    public string Username { get; set; } = "";
    public string Password { get; set; } = "";

    public List<Book> Books { get; set; } = new();
    public List<Quote> Quotes { get; set; } = new();
  }
}
