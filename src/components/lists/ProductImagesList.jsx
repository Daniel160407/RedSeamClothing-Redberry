const ProductImagesList = ({ images = [], onImageClick }) => {
  return (
    <div className="absolute top-20 left-20 flex w-[121px] flex-col gap-[9px]">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`product-${index}`}
          onClick={() => onImageClick(image)}
          className="cursor-pointer"
        />
      ))}
    </div>
  );
};

export default ProductImagesList;
