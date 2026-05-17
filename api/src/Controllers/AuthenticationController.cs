using api.src.DTOs;
using api.src.Interfaces;
using api.src.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.src.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController(IAuthenticationService _authenticationService) : ControllerBase
    {
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(LoginDto loginDto)
        {
            var result = await _authenticationService.Login(loginDto);
            Response.Cookies.Append("X-Access-Token", result.Token, new CookieOptions
            {
                HttpOnly = true, 
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddDays(1)
            });

            return Ok(result);
        }
    }
}
