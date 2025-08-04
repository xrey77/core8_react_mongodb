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
    public interface IProductService {
        void addProduct(Product products);
        IEnumerable<Product> ListAll(int page);
        IEnumerable<Product> SearchAll(string key);
        int TotPage();
    }

    public class ProductService : IProductService
    {
        private readonly IMongoCollection<Product> _collection;        

        public ProductService(
            IMongoDatabase database,
            IOptions<MongoDBSettings> productstoreDatabaseSettings
        )
        {
            var mongoClient = new MongoClient(
                productstoreDatabaseSettings.Value.ConnectionURI);

            var mongoDatabase = mongoClient.GetDatabase(
                productstoreDatabaseSettings.Value.DatabaseName);    

            _collection = mongoDatabase.GetCollection<Product>(
            productstoreDatabaseSettings.Value.ProductCollection);
        }

        public void addProduct(Product prod) {
            var filterDesc =  Builders<Product>.Filter.Eq(s => s.Descriptions, prod.Descriptions);
            var prodDesc = _collection.Find(filterDesc);
            Product prodResult = prodDesc.FirstOrDefault();
            if (prodResult != null) {
                throw new AppException("Product Description is already exits...");                
            }

            var filterProdpic =  Builders<Product>.Filter.Eq(s => s.ProductPicture, prod.ProductPicture);
            var prodPic = _collection.Find(filterProdpic);
            Product prodpicResult = prodPic.FirstOrDefault();
            if (prodpicResult != null) {
                throw new AppException("Product Picture is already exits...");                
            }
            _collection.InsertOne(prod);
        }

        public IEnumerable<Product> ListAll(int page)
        {
            var perpage = 5;
            var offset = (page -1) * perpage;

            var products = _collection.Find(_ => true)
            .SortBy(b => b.Id)
            .Skip(offset)
            .Limit(perpage)
            .ToList();
            return products;
        }

        public IEnumerable<Product> SearchAll(string key)
        {
            FilterDefinition<Product> filterDesc = Builders<Product>.Filter.Regex("Descriptions", "/.*" + key + ".*/i");
            List<Product> prods = _collection.Find(filterDesc).ToList();
            return prods;
        }

        public int TotPage()
        {
            var perpage = 5;
            List<Product> totrecs = _collection.Find(_ => true).ToList();           
            int totpage = (int)Math.Ceiling((float)(totrecs.Count()) / perpage);
            return totpage;
        }

    }
}