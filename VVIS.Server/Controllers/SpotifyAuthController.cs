using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;

namespace VVIS.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpotifyAuthController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;

        public SpotifyAuthController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost("token")]
        public async Task<IActionResult> GetToken()
        {
            var clientId = _configuration["Spotify:ClientId"];
            var clientSecret = _configuration["Spotify:ClientSecret"];

            if (string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(clientSecret))
            {
                return BadRequest("Spotify credentials are not configured");
            }

            var client = _httpClientFactory.CreateClient();
            
            // Create authorization header
            var authHeader = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeader);

            // Create request body
            var requestBody = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_type", "client_credentials")
            });

            try
            {
                var response = await client.PostAsync("https://accounts.spotify.com/api/token", requestBody);
                
                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, error);
                }

                var tokenResponse = await response.Content.ReadAsStringAsync();
                return Ok(tokenResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving token: {ex.Message}");
            }
        }
    }
}
