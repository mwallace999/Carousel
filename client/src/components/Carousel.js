import React from 'react';
import Product from './Product';

export default function Carousel(props) {
  return (
    <div className="carousel-componentContainer">
      <div>
        <p className="carousel-customerText">Customers who viewed this item also viewed</p>
        <p className="carousel-pagesText">Page {props.counter / 5 + 1} of {Math.ceil(props.productsNumber / 5)}</p>
      </div>
      <div className="carousel-carouselContainer">
        <button className="carousel-button" type="button" onClick={props.lastFive}> &lt; </button>
        <Product productsFive={props.productsFive} />
        <button className="carousel-button" type="button" onClick={props.nextFive}> &gt; </button>
      </div>
    </div>
  );
}
