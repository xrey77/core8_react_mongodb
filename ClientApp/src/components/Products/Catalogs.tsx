import React, {useState, useEffect} from 'react'
import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7241",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
})

interface Products {
  id: number,
  descriptions: string,
  qty: number,
  unit: string
  sellPrice: number,
  productPicture: string
}

const formatNumberWithCommaDecimal = (number: any) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2, // Ensures at least two decimal places
    maximumFractionDigits: 2, // Limits to two decimal places
  });
  // Format the number
  return formatter.format(number);
};

export function Catalogs() {
    let [page, setPage] = useState<number>(1);
    let [totpage, setTotpage] = useState<number>(0);
    const [prods, setProds] = useState<Products[]>([]);
  
    useEffect(() => {
        getCatalogs(page);
      },[page]);
    
      const getCatalogs = (pg: any) => {
        api.get(`/api/listproducts/${pg}`)
        .then((res) => {
            setProds(res.data.products);
            setTotpage(res.data.totpage);
            setPage(res.data.page);
        }, (error: any) => {
                console.log(error.message);
                return;
        });
    
      }
    
      const firstPage = (event: any) => {
        event.preventDefault();    
        page = 1;
        setPage(page);
        getCatalogs(page);
        return;    
      }
    
      const nextPage = (event: any) => {
        event.preventDefault();    
        if (page === totpage) {
            return;
        }
        setPage(page++);
        getCatalogs(page);
        return;
      }
    
      const prevPage = (event: any) => {
        event.preventDefault();    
        if (page === 1) {
          return;
          }
          setPage(page--);
          getCatalogs(page);
          return;    
      }
    
      const lastPage = (event: any) => {
        event.preventDefault();
        page = totpage;
        setPage(page);
        getCatalogs(page);
        return;    
      }
    

  return (
<div className="container-fluid mb-4">
    <h4 className="text-center">Product Catalogs</h4>
    <div className="card-group">
    {prods.map((item) => {
            return (
            <div className="card mx-1">
                <img src={item.productPicture} className="card-img-top" alt=""/>
                <div className="card-body">
                    <h5 className="card-title">Descriptions</h5>
                    <p className="card-text">
                      {item.descriptions}<br/>
                      Stocks :&nbsp;{item.qty}
                      </p>
                </div>
                <div className="card-footer">
                    <p className="card-text text-danger"><span className="text-dark">PRICE :</span>&nbsp;<strong>&#8369;{formatNumberWithCommaDecimal(item.sellPrice)}</strong></p>
                </div>  
            </div>
        );
    })}

    </div>    
    <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><a onClick={lastPage} className="page-link" href="/#">Last</a></li>
          <li className="page-item"><a onClick={prevPage} className="page-link" href="/#">Previous</a></li>
          <li className="page-item"><a onClick={nextPage} className="page-link" href="/#">Next</a></li>
          <li className="page-item"><a onClick={firstPage} className="page-link" href="/#">First</a></li>
          <li className="page-item page-link text-danger">Page&nbsp;{page} of&nbsp;{totpage}</li>

        </ul>
      </nav>

</div>
    )
}
