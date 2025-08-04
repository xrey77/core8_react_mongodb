import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faMapLocation, faCircleQuestion, faAddressCard, faUnlock } from '@fortawesome/free-solid-svg-icons'; 
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Login } from './Auth/Login';
import { Register } from './Auth/Register';
import './NavMenu.css';

export function NavMenu()  {
  
  const [username, setUsername] = useState('');
  const [userpic, setUserpic] = useState('');

  useEffect(() => {
    let usrname = sessionStorage.getItem('USERNAME');    
    if (usrname === null) {
      setUsername('');
    } else {
      setUsername(usrname);
    }
    let usrpic = sessionStorage.getItem("USERPIC");
    if (usrpic === null) {
      setUserpic('/pix.png');
    } else {
      setUserpic(usrpic);
    }
  },[username, userpic]);

  const Logout = () => {
    window.sessionStorage.removeItem("USERNAME");
    const navigate = useNavigate();
    navigate('/');
  }

    return (
      <header>
<nav className="navbar navbar-expand-lg hdr">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><img src="/wincor.png" className="logo" alt=""/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">   
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" to="/aboutus"><FontAwesomeIcon icon={faCircleQuestion}/>&nbsp;About Us</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <FontAwesomeIcon icon={faList}/>&nbsp;Products
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/productlist">Product List</Link></li>
            <li><Link className="dropdown-item" to="/productcatalogs">Product Catalogs</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" to="/productsearch">Product Search</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/Locateus"><FontAwesomeIcon icon={faMapLocation}/>&nbsp;Contact</Link>
        </li>
      </ul>

      { username === '' ? (
        <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/#" data-bs-toggle="modal" data-bs-target="#staticLogin"><FontAwesomeIcon icon={faUnlock}/>&nbsp;Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/#" data-bs-toggle="modal" data-bs-target="#staticRegister"><FontAwesomeIcon icon={faAddressCard}/>&nbsp;Register</Link>
          </li>
        </ul>
      ) :
      <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
        <li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" to="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img className="user" src={userpic} alt=""/>&nbsp;{username}</Link>
        <ul className="dropdown-menu">
          <li><Link onClick={Logout} className="dropdown-item" to="/#">Log-Off</Link></li>
          <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
          <li><hr className="dropdown-divider"/></li>
          <li><Link className="dropdown-item" to="/#">Messenger</Link></li>
        </ul>
      </li>
    </ul>

    }
    </div>
  </div>
</nav>        
{/*  OFF-CANVAS */}
<div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex={-1} id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
    <div className="offcanvas-header bg-primary">
      <h5 className="offcanvas-title text-white" id="offcanvasWithBothOptionsLabel">Drawer Menu</h5>
      <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>    
      </div>
    <div className="offcanvas-body">
  
      <ul className="nav flex-column">
        <li className="nav-item" data-bs-dismiss="offcanvas">
          <Link className="nav-link text-dark" to="/#">About Us</Link>
        </li>
        <li><hr/></li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle text-dark" to="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Products
          </Link>
          <ul className="dropdown-menu">
            <li data-bs-dismiss="offcanvas">
              <Link className="dropdown-item" to="/productlist">Product List</Link></li>
            <li data-bs-dismiss="offcanvas">
              <Link className="dropdown-item" to="/productcatalogs">Product Catalogs</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li data-bs-dismiss="offcanvas">
              <Link className="dropdown-item" to="/productsearch">Product Search</Link></li>
          </ul>
        </li>
        <li><hr/></li>
  
        <li className="nav-item" data-bs-dismiss="offcanvas">
          <Link className="nav-link text-dark" to="/#">Contact</Link>  
        </li>
        <li><hr/></li>

        { username === '' ? (
        <ul className="nav flex-column">  
        <li data-bs-dismiss="offcanvas" className="nav-item">
          <Link className="nav-link text-dark" aria-current="page" to="/#" data-bs-toggle="modal" data-bs-target="#staticLogin">Login</Link>
        </li>
        <li><hr/></li>
        <li data-bs-dismiss="offcanvas" className="nav-item">
          <Link className="nav-link text-dark" aria-current="page" to="/#" data-bs-toggle="modal" data-bs-target="#staticRegister">Register</Link>
        </li>     
        <li><hr/></li>                 
        </ul>
        ):
        <>   
        <ul className="nav">  
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img className="user" src={userpic} alt=""/>&nbsp;{username}
            </Link>
            <ul className="dropdown-menu">
              <li data-bs-dismiss="offcanvas">
                <Link className="dropdown-item" to="/#">Logout</Link></li>
              <li data-bs-dismiss="offcanvas">
                <Link className="dropdown-item" to="/profile">Profile</Link></li>
              <li><hr className="dropdown-divider"/></li>
              <li data-bs-dismiss="offcanvas">
                <Link className="dropdown-item" to="/#">Messenger</Link></li>
            </ul>
          </li>
        </ul>           
        <li><hr/></li>
        </>

        }
      </ul>
      {/* END-OFF CANVAS   */}
    </div>
    </div>
    <Login/>
    <Register/>
      </header>


    );
}
