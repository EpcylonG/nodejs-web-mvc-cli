import React from "react";

import Button from "../Button/Button";
import "./ProductCard.scss";


function ProductCard({
  id,
  img,
  title,
  handleAddToCart,
}) {
  function onAddToCart() {
    handleAddToCart(id);
  }

  return (
    <article className="ItemCard col col-12 col-md-6 col-lg-4 ml-1">
      <header>
        <div className="ItemCard__image-wrapper">
          <img src={img} className="ItemCard__image" alt={title}  />
        </div>
        <h2 className="ItemCard__title">{title}</h2>
      </header>
      <footer className="ItemCard__meta">
        <div className="ItemCard__icon-row">
          <Button onClick={onAddToCart}>Add to cart</Button>
        </div>
      </footer>
    </article>
  );
}

export default ProductCard;