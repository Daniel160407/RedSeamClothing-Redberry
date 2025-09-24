const Product = ({ product, onClick }) => {
  return (
    <div className="flex w-64 flex-col cursor-pointer" onClick={() => onClick(product.id)}>
      <img
        src={product.cover_image}
        alt={product.name}
        className="h-72 w-full object-cover"
      />

      <p className="mt-3 text-base font-semibold text-gray-900">
        {product.name}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-700">
        $ {product.price}
      </p>
    </div>
  );
};

export default Product;
