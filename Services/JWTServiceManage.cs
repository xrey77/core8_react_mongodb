using MongoDB.Bson;
using MongoDB.Driver;
using AutoMapper.Internal;
using core8_react_mongodb.Entities;
using core8_react_mongodb.Helpers;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System;

namespace core8_react_mongodb.Services
{
    public interface IJWTTokenServices
    {
        JWTTokens Authenticate(User users);
    }
    public class JWTServiceManage : IJWTTokenServices
    {
        private readonly IConfiguration _configuration;
        private readonly IMongoCollection<User> _collection;          
 
        public JWTServiceManage(IConfiguration configuration, IMongoDatabase database)
        {
            _configuration = configuration;
            _collection = database.GetCollection<User>("User");
        }
        public JWTTokens Authenticate(User users)
        {             
            if (users.UserName == null)
            {
                return null;            
            }
 
            var tokenhandler = new JwtSecurityTokenHandler();
            var tkey = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var ToeknDescp = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, users.UserName)
                }),
                Expires = DateTime.UtcNow.AddMinutes(5),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tkey), SecurityAlgorithms.HmacSha256Signature)
            };
            var toekn = tokenhandler.CreateToken(ToeknDescp);
            return new JWTTokens { Token = tokenhandler.WriteToken(toekn) };
        }
    }    
    
}