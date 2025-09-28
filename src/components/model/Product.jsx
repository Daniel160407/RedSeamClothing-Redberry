import { useEffect, useState } from "react";

const Product = ({ product, onClick, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`flex w-full transform cursor-pointer flex-col justify-center transition-all duration-500 ease-out ${
        isVisible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-6 scale-95 opacity-0"
      } hover:scale-105`}
      onClick={() => onClick(product.id)}
    >
      <img
        src={product.cover_image}
        alt={product.name}
        className="h-full w-full rounded-[10px] object-cover transition-transform duration-300 ease-out"
      />

      <p className="mt-3 text-[18px] font-medium text-gray-900 transition-colors duration-200 ease-out hover:text-gray-700">
        {product.name}
      </p>

      <p className="mt-1 text-[16px] font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-900">
        $ {product.price}
      </p>
    </div>
  );
};

export default Product;
