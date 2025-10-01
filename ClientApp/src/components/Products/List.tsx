import React, {useState, useEffect} from 'react'
import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7241",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
})

const toDecimal = (number: any) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2, // Ensures at least two decimal places
    maximumFractionDigits: 2, // Limits to two decimal places
  });
  // Format the number
  return formatter.format(number);
};

interface Products {
  id: number,
  descriptions: string,
  qty: number,
  unit: string
  sellPrice: number
}

export function ProductList() {

  let [page, setPage] = useState<number>(1);
  let [totpage, setTotpage] = useState<number>(0);
  let [ctr, setCtr] = useState<number>(0);
  const [prods, setProds] = useState<Products[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getProducts(page);
  },[page]);

  const getProducts = (pg: any) => {
    api.get(`/api/listproducts/${pg}`)
    .then((res) => {
        setProds(res.data.products);
        setTotpage(res.data.totpage);
        setPage(res.data.page);
    }, (error: any) => {
        setMessage(error.message);
        return;
    });
  }

  const firstPage = (event: any) => {
    event.preventDefault();    
    page = 1;
    setPage(page);
    setCtr(0);
    getProducts(page);
    return;    
  }

  const nextPage = (event: any) => {
    event.preventDefault();    
    if (page === totpage) {
        return;
    }
    setPage(page++);
    setCtr(ctr++);
    getProducts(page);
    return;
  }

  const prevPage = (event: any) => {
    event.preventDefault();    
    if (page === 1) {
      return;
      }
      setPage(page--);
      setCtr(ctr-10);
      getProducts(page);
      return;    
  }

  const lastPage = (event: any) => {
    event.preventDefault();
    page = totpage;
    setPage(page);
    setCtr(ctr*5);
    getProducts(page);
    return;    
  }

  return (
   <div className="container-fluid">
    <h1 className="text-center">Product List</h1>
    <div className='text-danger'>{message}</div>
    <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Descriptions</th>
            <th scope="col">Stocks</th>
            <th scope="col">Unit</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
        {prods.map((item) => {
            return (
              <tr>
                 <td key={item.id}>{ctr +=1}</td>
                 <td>{item.descriptions}</td>
                 <td>{item.qty}</td>
                 <td>{ item.qty > 1 ? item.unit+'S' : 'UNIT'}</td>
                 <td>&#8369;{toDecimal(item.sellPrice)}</td>
               </tr>
              );
        })}

        </tbody>
    </table>    

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
