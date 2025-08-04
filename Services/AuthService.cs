using System.Diagnostics;
using MongoDB.Driver;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using core8_react_mongodb.Entities;
using core8_react_mongodb.Helpers;
using core8_react_mongodb.Models;
using core8_react_mongodb.Models.dto;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace core8_react_mongodb.Services
{    
    public interface IAuthService {
        User SignupUser(User userdata, string passwd);
        User SigninUser(string usrname, string pwd);
    }

    public class AuthService : IAuthService
    {
        private readonly IMongoCollection<User> _collection;        

         IConfiguration config = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json")
        .AddEnvironmentVariables()
        .Build();

        public AuthService(
            IMongoDatabase database,
            IOptions<MongoDBSettings> userstoreDatabaseSettings
            )
        {
            _collection = database.GetCollection<User>("Users");
            var mongoClient = new MongoClient(
                userstoreDatabaseSettings.Value.ConnectionURI);

            var mongoDatabase = mongoClient.GetDatabase(
                userstoreDatabaseSettings.Value.DatabaseName);    

            _collection = mongoDatabase.GetCollection<User>(
            userstoreDatabaseSettings.Value.UserCollection);

        }

        public User SignupUser(User userdata, string passwd)
        {
            var filterEmail =  Builders<User>.Filter.Eq(s => s.Email, userdata.Email);
            var usrMail = _collection.Find(filterEmail);
            User resEmail = usrMail.FirstOrDefault();
            if (resEmail != null) {
                throw new AppException("Email Address was already taken...");                
            }

            var filterUsername =  Builders<User>.Filter.Eq(s => s.UserName, userdata.UserName);
            var usrName = _collection.Find(filterUsername);
            User resUsername = usrName.FirstOrDefault();
            if (resUsername != null) {
                throw new AppException("Username was already taken...");               
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var xkey = config["Jwt:Key"];
            var key = Encoding.ASCII.GetBytes(xkey);

            // CREATE SECRET KEY FOR USER TOKEN===============
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, userdata.Email)
                }),
                // Expires = DateTime.UtcNow.AddDays(7),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var secret = tokenHandler.CreateToken(tokenDescriptor);
            var secretkey = tokenHandler.WriteToken(secret);

            userdata.Secretkey = secretkey.ToUpper();             
            userdata.Password = BCrypt.Net.BCrypt.HashPassword(passwd);
            userdata.Profilepic = "https://localhost:7241/users/pix.png";
            userdata.Roles="USER";
            _collection.InsertOne(userdata);
            return userdata;
        }

        public User SigninUser(string usrname, string pwd)
        {
            try {
                var filterUsername =  Builders<User>.Filter.Eq(s => s.UserName, usrname);
                var usr = _collection.Find(filterUsername);
                User res = usr.FirstOrDefault();
                    if (res != null) {
                        if (!BCrypt.Net.BCrypt.Verify(pwd, res.Password)) {
                            throw new AppException("Incorrect Password...");
                        }
                        if (res.Isactivated == 0) {
                            throw new AppException("Please activate your account, check your email client inbox and click or tap the Activate button.");
                        }
                        return res;
                    } else {
                        throw new AppException("Username not found, please register first...");
                    }
            } catch(Exception ex) {
                throw new AppException(ex.Message);
            }
        }
    }
}