import React from 'react';
import { Link } from 'react-router-dom';
import '../custom.css';

export class Home extends React.Component {

  render() {
    return (
      <>
<div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="/1.png" className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="/2.png" className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="/3.png" className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="/4.png" className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Fourth slide label</h5>
        <p>Some representative placeholder content for the fourth slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="/5.png" className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Fifth slide label</h5>
        <p>Some representative placeholder content for the fifth slide.</p>
      </div>
    </div>

  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
<div className="card text-center mt-2 mb-5">
  <div className="card-header">
    <h4>Transforming the Way People Bank and Shop</h4>
  </div>
  <div className="card-body">
    <h5 className="card-title">Shape the Future of Banking at Intersect Nashville 2025 </h5>
    <p className="card-text">Collaborate with financial executives, explore cutting-edge technology and strategize your future at Intersect Nashville from Aug. 25-27. Don’t miss out on our leading client event shaping the future of banking.</p>
    <Link to="/#" className="btn btn-primary">More Info</Link>
  </div>
  <div className="card-footer text-muted">
  Now is the time to lay the groundwork for a successful peak season. With the right services in place, retailers can avoid disruption, reduce complexity, and stay focused on revenue-driving tasks.
  </div>
</div>
</>      
);
  }
}
