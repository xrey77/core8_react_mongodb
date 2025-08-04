using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using core8_react_mongodb.Services;
using core8_react_mongodb.Entities;
using core8_react_mongodb.Models.dto;
using core8_react_mongodb.Helpers;

namespace core8_react_mongodb.Controllers.Users
{
    [ApiExplorerSettings(GroupName = "Retrieve User ID")]
    [Authorize]    
    [ApiController]
    [Route("[controller]")]
    public class GetbyidController : ControllerBase
    {

    private IUserService _userService;

    private IMapper _mapper;
    private readonly IConfiguration _configuration;  

    private readonly IWebHostEnvironment _env;

    private readonly ILogger<GetbyidController> _logger;

    public GetbyidController(
        IConfiguration configuration,
        IWebHostEnvironment env,
        IUserService userService,
        IMapper mapper,
        ILogger<GetbyidController> logger
        )
    {
        _configuration = configuration;  
        _userService = userService;
        _mapper = mapper;
        _logger = logger;
        _env = env;        
    }  
 
        [HttpGet("/api/getbyid/{id}")]
        public IActionResult getByuserid(String id) {
            try {
                var user = _userService.GetById(id);
                var model = _mapper.Map<UserModel>(user);
                return Ok(new {
                    statuscode = 200,
                    message = "User found.",
                    user = model
                });

            } catch(AppException ex) {
                return NotFound(new {
                    statuscode = 404,
                    message = ex.Message
                });

            }
        }
    }
    
}