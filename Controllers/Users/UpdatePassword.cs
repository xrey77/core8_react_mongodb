using System.Diagnostics;
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
    public class UpdatePasswordController : ControllerBase {
        
    private IUserService _userService;

    private IMapper _mapper;
    private readonly IConfiguration _configuration;  

    private readonly IWebHostEnvironment _env;

    private readonly ILogger<UpdatePasswordController> _logger;

    public UpdatePasswordController(
        IConfiguration configuration,
        IWebHostEnvironment env,
        IUserService userService,
        IMapper mapper,
        ILogger<UpdatePasswordController> logger
        )
    {
        _configuration = configuration;  
        _userService = userService;
        _mapper = mapper;
        _logger = logger;
        _env = env;        
    }  

        [HttpPatch("/api/updatepassword")]        
        public IActionResult updateUserPassword([FromBody]UserPasswordUpdate model) {                
            try
            {
                var user = _mapper.Map<User>(model);
                user.Id = model.Id;
                user.Password = model.Password;
                _userService.UpdatePassword(user);
                return Ok(new {statuscode=200, message="Your profile password has been updated.",user = model});
            }
            catch (AppException ex)
            {
                return BadRequest(new { statuscode = 404, message = ex.Message });
            }
        }


    }
}