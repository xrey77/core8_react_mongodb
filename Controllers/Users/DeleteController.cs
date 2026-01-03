using AutoMapper;
using core8_react_mongodb.Helpers;
using core8_react_mongodb.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace core8_react_mongodb.Controllers.Users
{
    [ApiExplorerSettings(GroupName = "Delete User")]
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DeleteController : ControllerBase {

    private IUserService _userService;

    private IMapper _mapper;
    private readonly IConfiguration _configuration;  

    private readonly IWebHostEnvironment _env;

    private readonly ILogger<DeleteController> _logger;

    public DeleteController(
        IConfiguration configuration,
        IWebHostEnvironment env,
        IUserService userService,
        IMapper mapper,
        ILogger<DeleteController> logger
        )
    {
        _configuration = configuration;  
        _userService = userService;
        _mapper = mapper;
        _logger = logger;
        _env = env;        
    }  

        [HttpDelete]
        public IActionResult deleteUser(String id) {
            try
            {
               _userService.Delete(id);
            return Ok();
           }
            catch (AppException ex)
            {
                return BadRequest(new {message = ex.Message });
            }

        }
    }
}