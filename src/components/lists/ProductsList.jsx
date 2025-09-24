import Product from "../model/Product";

const ProductsList = ({ products, onProductClick }) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <Product key={index} product={product} onClick={onProductClick} />
      ))}
    </div>
  );
};

export default ProductsList;
