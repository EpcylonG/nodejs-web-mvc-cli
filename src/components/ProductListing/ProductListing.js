import React from "react";

import ProductCard from "../ProductCard/ProductCard";

function ProductsListing({
  products,
  handleAddToCart,
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
          handleAddToCart={handleAddToCart}
        />
      )))}
    </section>
  );
}

export default ProductsListing;