namespace core8_react_mongodb.Models
{
    public class TokenModel {
        public String Email { get; set; }
        public String secretKey { get; set; }
        public bool verified { get; set; }        
    }
}