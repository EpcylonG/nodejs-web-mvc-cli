import React from "react";

import ProductCard from "../ProductCard/ProductCard";

function ProductsListing({
  products,
//   handleDownVote,
//   handleUpVote,
//   handleSetFavorite,
//   handleAddToCart,
  ...props
}) {

    
  return (          
    <section className="row" {...props}>
      {products && (products.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          img={product.image}
          title={product.title}
        //   shortDescription={product.shortDescription}
        //   upVotes={product.votes.upVotes}
        //   handleUpVote={handleUpVote}
        //   downVotes={product.votes.downVotes}
        //   handleDownVote={handleDownVote}
        //   isFavorite={product.isFavorite}
        //   handleSetFavorite={handleSetFavorite}
        //   handleAddToCart={handleAddToCart}
        />
      )))}
    </section>
  );
}

export default ProductsListing;