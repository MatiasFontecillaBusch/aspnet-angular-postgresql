using System.Security.Claims;
using api.src.Exceptions;

namespace api.src.Middleware;

public class UserProviderMiddleware(RequestDelegate _next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        if (context.User.Identity?.IsAuthenticated == true)
        {
            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                throw new AppError("Usuario de la petición no registrado", 400);
            }
            context.Items["tokenUserId"] = userId;
        }

        await _next(context);
    }
}