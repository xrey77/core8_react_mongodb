
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;

namespace core8_react_mongodb.Entities
{
    
[CollectionName("Product")]
public class Product {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("category")]
        public string Category { get; set; }

        [BsonElement("descriptions")]
        public string Descriptions { get; set; }

        [BsonElement("qty")]
        public int Qty { get; set; }

        [BsonElement("unit")]
        public string Unit { get; set; }

        [BsonElement("costprice")]
        public decimal CostPrice { get; set; }

        [BsonElement("sellprice")]
        public decimal SellPrice { get; set; }

        [BsonElement("saleprice")]
        public decimal SalePrice { get; set; }

        [BsonElement("productpicture")]
        public string ProductPicture { get; set; }

        [BsonElement("alertstocks")]
        public int AlertStocks { get; set; }

        [BsonElement("criticalstocks")]
        public int CriticalStocks { get; set; }

        [BsonElement("createdat")]
         public DateTime CreatedAt { get; set; } = DateTime.Now;

        [BsonElement("updatedat")]
         public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }    
}