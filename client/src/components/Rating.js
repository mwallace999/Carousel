import React from 'react';

export default function Rating({ product, goToRating }) {
  const rating = [];
  let image = '';
  const url = ' ../styles/images/';
  for (let i = 1; i < 6; i++) {
    if (i <= product.rating) image = `${url}full_leaf.png`;
    else if (i - product.rating <= 0.25) image = `${url}full_leaf.png`;
    else if (i - product.rating > 0.25 && i - product.rating < 0.75) image = `${url}half_leaf.png`;
    else image = `${url}empty_leaf.png`;

    rating.push(
      <img
        key={i}
        src={image}
        alt="Leaf"
        data-id={product.productId}
        className="carousel-rating"
        onClick={goToRating}
        height="27px"
        width="27px"
      />,
    );
  }

  return (
    <div>
      {rating}
    </div>
  );
}
