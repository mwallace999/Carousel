import React from 'react';
import Rating from './Rating.js';

export default function Product(props) {
  return (
    <div className="carousel-productContainer">
      {Array.from(props.productsFive).map((product, index) => {
        return (
          <div key={index} className="carousel-productBlock">
            <img
              className="carousel-image"
              src={product.imgUrl}
              data-id={product.productId}
            />
            <div className="carousel-textBox">
              <div className="carousel-nameText" data-id={product.productId}>{product.productName}</div>
              <Rating product={product} />
              <div className="carousel-priceText" data-id={product.productId}>${(product.price).toFixed(2)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
