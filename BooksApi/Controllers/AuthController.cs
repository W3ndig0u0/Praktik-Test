using BooksApi.Data;
using BooksApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;



[Route("BooksApi/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
  private readonly AppDbContext _context;

  private readonly IConfiguration _config;

  public AuthController(AppDbContext context, IConfiguration config)
  {
    _context = context;
    _config = config;
  }

  private string GenerateJwtToken(User user)
  {
    var claims = new[]
    {
     new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
     new Claim(ClaimTypes.Name, user.Username)
    };

    var jwtKey = _config["Jwt:Key"];
    var jwtIssuer = _config["Jwt:Issuer"];
    var jwtAudience = _config["Jwt:Audience"];

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: jwtIssuer,
        audience: jwtAudience,
        claims: claims,
        expires: DateTime.Now.AddHours(1),
        signingCredentials: creds
    );
    Console.WriteLine($"JWT Key: {jwtKey}");

    return new JwtSecurityTokenHandler().WriteToken(token);
  }


  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] RegisterModel model)
  {
    if (await _context.Users.AnyAsync(u => u.Username == model.Username))
    {
      return Conflict(new
      {
        message = $"Användarnamnet '{model.Username}' finns redan. Välj ett annat."
      });
    }

    var user = new User { Username = model.Username, Password = model.Password };
    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    var token = GenerateJwtToken(user);

    return Ok(new
    {
      message = "Användare skapad och inloggad",
      userId = user.Id,
      username = user.Username,
      token
    });
  }


  [HttpGet("all")]
  public async Task<ActionResult<IEnumerable<User>>> GetAllUsers() =>
      Ok(await _context.Users.ToListAsync());

  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginModel model)
  {
    var user = await _context.Users.SingleOrDefaultAsync(u =>
        u.Username == model.Username && u.Password == model.Password);

    if (user == null)
      return Unauthorized("Fel användarnamn eller lösenord");

    var token = GenerateJwtToken(user);

    return Ok(new
    {
      message = "Inloggad",
      userId = user.Id,
      username = user.Username,
      token
    });
  }
}

public class RegisterModel
{
  public string Username { get; set; } = "";
  public string Password { get; set; } = "";
}

public class LoginModel
{
  public string Username { get; set; } = "";
  public string Password { get; set; } = "";
}
