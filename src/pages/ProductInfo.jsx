import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAxios from "../hooks/UseAxios";
import ProductImagesList from "../components/lists/ProductImagesList";
import Navbar from "../components/layout/Navbar";
import ProductDetails from "../components/layout/ProductDetails";

const ProductInfo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productInfo, setProductInfo] = useState({});
  const [activeImage, setActiveImage] = useState("/");
  const [openShoppingCart, setOpenShoppingCart] = useState(false);

  const [productSettings, setProductSettings] = useState({
    color: searchParams.get("color") ?? "",
    size: "M",
    quantity: "1",
  });

  const handleColorChange = (index) => {
    const color = productInfo.available_colors[index];
    setActiveImage(productInfo.images[index]);
    setProductSettings({ ...productSettings, color });

    const params = new URLSearchParams(searchParams);
    params.set("color", color);
    setSearchParams(params);
  };

  const handleAddToCart = async () => {
    try {
      const response = await useAxios.post(
        `/cart/products/${productInfo.id}`,
        productSettings,
      );
      if (response?.status === 201) {
        setOpenShoppingCart(true);
      }
    } catch (err) {
      console.error("Request failed with error: " + err);
    }
  };

  useEffect(() => {
    const fetchProductInfo = async () => {
      const response = await useAxios.get(
        `/products/${searchParams.get("id")}`,
      );

      const data = response.data;
      setProductInfo(data);
      if (productSettings.color !== "") {
        const indexOfColor = data.available_colors.indexOf(
          productSettings.color,
        );
        setActiveImage(data.images[indexOfColor]);
      } else {
        setActiveImage(data.images[0]);
      }
    };

    fetchProductInfo();
  }, []);

  useEffect(() => {
    if (productInfo?.images) {
      const indexOfImage = productInfo.images.indexOf(activeImage);
      handleColorChange(indexOfImage);
    }
  }, [activeImage]);

  return (
    <>
      <Navbar openCart={openShoppingCart} setOpenCart={setOpenShoppingCart} />
      <div className="flex">
        <div>
          <div>
            <p className="absolute top-[110px] left-[100px] text-[14px]">
              Listing / Product
            </p>
            <ProductImagesList
              images={productInfo.images}
              onImageClick={setActiveImage}
            />
          </div>
          <img
            src={activeImage}
            className="top-45 absolute left-[245px] max-w-[703px]"
          />
        </div>
        <ProductDetails
          productInfo={productInfo}
          productSettings={productSettings}
          setProductSettings={setProductSettings}
          onColorChange={handleColorChange}
          onAddToCart={handleAddToCart}
        />
      </div>
    </>
  );
};

export default ProductInfo;
