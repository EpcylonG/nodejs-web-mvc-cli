import React from "react";

// import FavoriteIconButton from "../FavoriteIconButton";
// import IconButton from "../IconButton";
import Button from "../Button/Button";
// import { ThumbDown, ThumbUp } from "../SVGIcons";
import "./ProductCard.scss";

function Divider() {
  return <hr className="ItemCard__divider" />;
}

// function getPopularityClasses(
//   currentValue,
//   limit,
//   prevClasses,
//   popularityClassName,
// ) {
//   const halfLimit = Math.floor(limit / 2);

//   if (currentValue >= halfLimit) {
//     return `${prevClasses} ${popularityClassName}`;
//   }

//   return prevClasses;
// }

function ProductCard({
  id,
  img,
  title,
  shortDescription,
  isFavorite,
  upVotes,
  downVotes,
  handleDownVote,
  handleUpVote,
  handleSetFavorite,
  handleAddToCart,
}) {
  function onDownVote() {
    handleDownVote(id);
  }
  function onUpVote() {
    handleUpVote(id);
  }
  function onSetFavorite() {
    handleSetFavorite(id);
  }
  function onAddToCart() {
    handleAddToCart(id);
  }

  console.log(id);

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