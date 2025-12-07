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
    public class BooksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BooksController(AppDbContext context)
        {
            _context = context;
        }

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetAll()
        {
            var userId = GetUserId();
            var books = await _context.Books
                .Where(b => b.UserId == userId)
                .ToListAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetById(int id)
        {
            var userId = GetUserId();
            var book = await _context.Books
                .Where(b => b.UserId == userId && b.Id == id)
                .FirstOrDefaultAsync();

            if (book == null) return NotFound();
            return Ok(book);
        }

        [HttpPost]
        public async Task<ActionResult<Book>> Create(Book newBook)
        {
            newBook.UserId = GetUserId();
            _context.Books.Add(newBook);
            await _context.SaveChangesAsync();
            return Ok(newBook);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Book>> Update(int id, Book updatedBook)
        {
            var userId = GetUserId();
            var book = await _context.Books
                .Where(b => b.UserId == userId && b.Id == id)
                .FirstOrDefaultAsync();

            if (book == null) return NotFound();

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.PublishedAt = updatedBook.PublishedAt;

            await _context.SaveChangesAsync();
            return Ok(book);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetUserId();
            var book = await _context.Books
                .Where(b => b.UserId == userId && b.Id == id)
                .FirstOrDefaultAsync();

            if (book == null) return NotFound();

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
