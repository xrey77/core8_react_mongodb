using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;

namespace core8_react_mongodb.Entities
{
    [CollectionName("User")]
    public class User {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {get; set;}

        [BsonElement("lastname")]
        public string LastName {get; set;} = null!;

        [BsonElement("firstname")]
        public string FirstName {get; set;} = null!;

        [BsonElement("username")]
        public string UserName {get; set;} = null!;

        [BsonElement("password")]
        public string Password {get; set;} = null!;

        [BsonElement("email")]
        public string Email { get; set; } = null!;

        [BsonElement("mobilde")]
        public string Mobile { get; set; } = null!;

        [BsonElement("roles")]
        public string Roles { get; set; } = null!;

        [BsonElement("isactivated")]
        public int Isactivated {get; set;}

        [BsonElement("isblocked")]
        public int Isblocked {get; set;}

        [BsonElement("mailtoken")]
        public int Mailtoken {get; set;}

        [BsonElement("qrcodeurl")]
        public string Qrcodeurl {get; set;} = null!;

        [BsonElement("profilepic")]
        public string Profilepic {get; set;} = null!;

        [BsonElement("secretkey")]
        public string Secretkey  {get; set;} = null!;

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

    }
}