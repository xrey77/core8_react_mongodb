import React, {useState} from 'react'
import axios from 'axios';
import '../../custom.css';

const api = axios.create({
    baseURL: "https://localhost:7241",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
})

interface Products {
  descriptions: string,
  sellPrice: number,
  productPicture: string,
  qty: number,
  unit: string
}

const formatNumberWithCommaDecimal = (number: any) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2, // Ensures at least two decimal places
    maximumFractionDigits: 2, // Limits to two decimal places
  });
  // Format the number
  return formatter.format(number);
};


export function ProductSearch() {
  const [prodsearch, setProdsearch] = useState<Products[]>([]);
  let [searchkey, setSearchkey] = useState<string>('');

  const getProdsearch = (event: any) => {
      event.preventDefault();
      
      const data = JSON.stringify({ search: searchkey});

      api.post("/api/searchproducts",data)
      .then((res) => {
        setProdsearch(res.data.products);
      }, (error: any) => {
          // setErrors(error.message);
          console.log(error.message);
          return;
      });  
  }

  return (
    <div className="container mb-4">
        <h2>Search Product</h2>

        <form className="row g-3" onSubmit={getProdsearch} autoComplete='off'>
            <div className="col-auto">
              <input type="text" required className="form-control-sm" value={searchkey} onChange={e => setSearchkey(e.target.value)} placeholder="enter Product keyword"/>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary btn-sm mb-3">search</button>
            </div>
        </form>
        
        <div className="card-group mb-4">
        {prodsearch.map((item) => {
                return (
                  <div className="card product-size mx-1">
                    <img src={item.productPicture} className="card-img-top product-size" alt="..."/>
                    <div className="card-body">
                      <h5 className="card-title">Descriptions</h5>
                      <p className="card-text">
                        {item.descriptions}<br/>
                        Stocks :&nbsp;{item.qty}
                        </p>

                    </div>
                    <div className="card-footer">
                      <p className="card-text text-danger"><span className="text-dark">PRICE :</span>&nbsp;<strong>
                        &#8369;{formatNumberWithCommaDecimal(item.sellPrice)}</strong></p>
                    </div>   
                  </div>
                );
        })}
        </div>    
      
    </div>
    )
}
