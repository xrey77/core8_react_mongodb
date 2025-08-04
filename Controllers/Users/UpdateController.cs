using core8_react_mongodb.Entities;
using core8_react_mongodb.Helpers;
using core8_react_mongodb.Models.dto;
using core8_react_mongodb.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using AutoMapper;

namespace core8_react_mongodb.Controllers.Users
{
    [ApiExplorerSettings(GroupName = "Update User")]
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UpdateController : ControllerBase {
        
    private IUserService _userService;

    private IMapper _mapper;
    private readonly IConfiguration _configuration;  

    private readonly IWebHostEnvironment _env;

    private readonly ILogger<UpdateController> _logger;

    public UpdateController(
        IConfiguration configuration,
        IWebHostEnvironment env,
        IUserService userService,
        IMapper mapper,
        ILogger<UpdateController> logger
        )
    {
        _configuration = configuration;  
        _userService = userService;
        _mapper = mapper;
        _logger = logger;
        _env = env;        
    }  


        [HttpPut("/api/updateprofile/{id}")]        
        public IActionResult updateUser(String id, UserUpdate model) {
            var user = _mapper.Map<User>(model);
            user.Id = id;
            user.FirstName = model.Firstname;
            user.LastName = model.Lastname;
            user.Mobile = model.Mobile;
            DateTime now = DateTime.Now;
            user.UpdatedAt = now;
            try
            {
                _userService.UpdateProfile(user);
                return Ok(new {statuscode=200, message="Your profile has been updated.",user = model});
            }
            catch (AppException ex)
            {
                return BadRequest(new { statuscode = 404, message = ex.Message });
            }
        }

    }
}