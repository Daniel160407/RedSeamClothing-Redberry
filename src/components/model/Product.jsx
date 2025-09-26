const Product = ({ product, onClick }) => {
  return (
    <div
      className="flex w-full cursor-pointer flex-col justify-center"
      onClick={() => onClick(product.id)}
    >
      <img
        src={product.cover_image}
        alt={product.name}
        className="h-full w-full object-cover"
      />

      <p className="mt-3 text-[18px] font-semibold text-gray-900">
        {product.name}
      </p>

      <p className="mt-1 text-[16px] font-medium text-gray-700">
        $ {product.price}
      </p>
    </div>
  );
};

export default Product;
