using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using BooksApi.Models;
using BooksApi.Data;

namespace BooksApi.Controllers
{
  [Authorize]
  [ApiController]
  [Route("BooksApi/[controller]")]
  public class QuotesController : ControllerBase
  {
    private readonly AppDbContext _context;

    public QuotesController(AppDbContext context)
    {
      _context = context;
    }

    private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Quote>>> GetAll()
    {
      var userId = GetUserId();
      var quotes = await _context.Quotes
          .Where(q => q.UserId == userId)
          .ToListAsync();

      return Ok(quotes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Quote>> GetById(int id)
    {
      var userId = GetUserId();
      var quote = await _context.Quotes
          .Where(q => q.UserId == userId && q.Id == id)
          .FirstOrDefaultAsync();

      if (quote == null) return NotFound();
      return Ok(quote);
    }

    [HttpPost]
    public async Task<ActionResult<Quote>> Create(Quote newQuote)
    {
      newQuote.UserId = GetUserId();
      _context.Quotes.Add(newQuote);
      await _context.SaveChangesAsync();
      return Ok(newQuote);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Quote>> Update(int id, Quote updatedQuote)
    {
      var userId = GetUserId();
      var quote = await _context.Quotes
          .Where(q => q.UserId == userId && q.Id == id)
          .FirstOrDefaultAsync();

      if (quote == null) return NotFound();

      quote.Text = updatedQuote.Text;
      quote.Author = updatedQuote.Author;

      await _context.SaveChangesAsync();
      return Ok(quote);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      var userId = GetUserId();
      var quote = await _context.Quotes
          .Where(q => q.UserId == userId && q.Id == id)
          .FirstOrDefaultAsync();

      if (quote == null) return NotFound();

      _context.Quotes.Remove(quote);
      await _context.SaveChangesAsync();
      return Ok();
    }
  }
}
