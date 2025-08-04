using System.Diagnostics;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using core8_react_mongodb.Entities;
using core8_react_mongodb.Helpers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace core8_react_mongodb.Services
{
    public interface IUserService {
        IEnumerable<User> GetAll();
        User GetById(String id);
        void UpdateProfile(User user);
        Boolean Delete(String id);
        void ActivateMfa(String id, string qrcode_url);
        void UpdatePicture(String id, string file);
        void UpdatePassword(User user);
        int EmailToken(int etoken);
        int SendEmailToken(string email);
        void ActivateUser(String id);
        void ChangePassword(User userParam);
    }

    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _collection;        

        //  IConfiguration config = new ConfigurationBuilder()
        // .AddJsonFile("appsettings.json")
        // .AddEnvironmentVariables()
        // .Build();

        public UserService(
            IMongoDatabase database,
            IOptions<MongoDBSettings> userstoreDatabaseSettings
        )
        {
            var mongoClient = new MongoClient(
                userstoreDatabaseSettings.Value.ConnectionURI);

            var mongoDatabase = mongoClient.GetDatabase(
                userstoreDatabaseSettings.Value.DatabaseName);    

            _collection = mongoDatabase.GetCollection<User>(
            userstoreDatabaseSettings.Value.UserCollection);
        }

        public bool Delete(String id)
        {
            try {
                User user = GetById(id);
                if (user is not null) {
                    _collection.DeleteOneAsync(Builders<User>.Filter.Eq("Id", id));
                    return true;
                } else {
                    return false;
                }
            } catch (Exception ex) {
                throw new AppException(ex.Message);
            }

        }

        public IEnumerable<User> GetAll()
        {
            try {
                List<User> usr = _collection.Find(_ => true).ToList();
                return usr;
            } catch(Exception ex) {
                    throw new AppException(ex.Message);
            }
        }

        public User GetById(String id)
        {
            try {
                List<User> usr = _collection.Find(x => x.Id == id).ToList();
                return usr.FirstOrDefault();
            } catch(Exception) {
                throw new AppException("User ID not found.");
            }
        }

        public void UpdateProfile(User user)
        {
            try {
                var filter = Builders<User>.Filter.Eq(s => s.Id, user.Id);
                    var update = Builders<User>.Update
                            .Set(s => s.LastName, user.LastName)
                            .Set(s => s.FirstName, user.FirstName)
                            .Set(s => s.Mobile, user.Mobile)
                            .CurrentDate(s => s.UpdatedAt);
                    _collection.UpdateOne(filter, update);

            } catch(Exception) {
                throw new AppException("User ID not found, please register first...");
            }
        }

        public void UpdatePassword(User userParam)
        {
            try {
                var filter =  Builders<User>.Filter.Eq(s => s.Id, userParam.Id);
                if (userParam.Password is not null)
                {
                    var password = BCrypt.Net.BCrypt.HashPassword(userParam.Password);
                    DateTime now = DateTime.Now;
                    var update = Builders<User>.Update
                            .Set(s => s.Password, password)
                            .Set(s => s.UpdatedAt, now);
                    _collection.UpdateOne(filter, update);
                } 
            } catch(Exception) {
                throw new AppException("User ID not found, please register first...");
            }

        }

        public void ActivateMfa(string id, string qrcode_url)
        {
            try {
                var filter =  Builders<User>.Filter.Eq(s => s.Id, id);
                var update = Builders<User>.Update
                        .Set(s => s.Qrcodeurl, qrcode_url)
                        .CurrentDate(s => s.UpdatedAt);
                _collection.UpdateOne(filter, update);
            } catch(Exception) {
                throw new AppException("User not found");
            }
            
        }

        public void UpdatePicture(String id, string file)
        {
            try {
                var filter =  Builders<User>.Filter.Eq(s => s.Id, id);
                var update = Builders<User>.Update
                        .Set(s => s.Profilepic, file)
                        .CurrentDate(s => s.UpdatedAt);
                _collection.UpdateOne(filter, update);
            } catch(Exception) {
                throw new AppException("User not found");
            }
        }

       public void ActivateUser(String id) 
       {
        try {
                var filter =  Builders<User>.Filter.Eq(s => s.Id, id);                        
                var update = Builders<User>.Update
                        .Set(s => s.Isactivated, 1)
                        .CurrentDate(s => s.UpdatedAt);
                _collection.UpdateOne(filter, update);
            } catch(Exception)  {
                throw new AppException("User not found");
            }
       }

        public int SendEmailToken(string email)
        {
        //    var user =  _context.Users.AsQueryable().FirstOrDefault(c => c.Email == email);
         try {
            var user = Builders<User>.Filter.Eq(s => s.Email, email); 
            var results = _collection.Find(user).ToListAsync();
            // var etoken = EmailToken(results.Mailtoken);
            // var update = Builders<User>.Update
            //         .Set(s => s.Mailtoken, etoken)
            //         .CurrentDate(s => s.UpdatedAt);
            // _collection.Users.UpdateOne(user, update);

            // user.Mailtoken = etoken;
            // _context.Users.Update(user);
            // _context.SaveChanges();
            return 0;
         } catch(Exception) {
            throw new AppException("Email Address not found...");            
         }
        }       

        public int EmailToken(int etoken)
        {
            int _min = etoken;
            int _max = 9999;
            Random _rdm = new Random();
            return _rdm.Next(_min, _max);
        }

        public void ChangePassword(User userParam)
        {
            var xuser = Builders<User>.Filter.Eq(s => s.Email, userParam.Email); 
            var results = _collection.Find(xuser).ToListAsync();
            var password = BCrypt.Net.BCrypt.HashPassword(userParam.Password);
            var update = Builders<User>.Update
                    .Set(s => s.Password, password)
                    .CurrentDate(s => s.UpdatedAt);
            _collection.UpdateOne(xuser, update);
        }



    }
}