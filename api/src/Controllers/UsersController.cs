using api.src.DTOs;
using api.src.Responses;
using api.src.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.src.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Administrator")]
    public class UsersController(IUserService _userService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<PagedResponse<UserResponse>>> GetAll([FromQuery] GetUsersDto getUsersDto)
        {
            var result = await _userService.GetUsersAsync(getUsersDto);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponse>> GetById(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound(new { message = $"Usuario con ID {id} no fue encontrado." });
            }

            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<UserResponse>> Create([FromBody] CreateUserDto createUserDto)
        {
            var createdUser = await _userService.CreateUserAsync(createUserDto);

            return CreatedAtAction(nameof(GetById), new { id = createdUser.Id }, createdUser);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<UserResponse>> Update(string id, [FromBody] UpdateUserDto updateUserDto)
        {
            return await _userService.UpdateUserAsync(id, updateUserDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var success = await _userService.DeleteUserAsync(id);

            if (!success)
            {
                return NotFound(new { message = $"No se pudo eliminar. Usuario con ID {id} no existe." });
            }

            return NoContent(); // 204 No Content para eliminaciones exitosas
        }
    }
}