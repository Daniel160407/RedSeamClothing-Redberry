import { useEffect, useState } from "react";
import useAxios from "../../hooks/UseAxios";
import Cookies from "js-cookie";
import CloseIcon from "../icons/CloseIcon";
import CartProduct from "../model/CartProduct";
import Button from "../uiComponents/Button";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ setShowCart }) => {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsAmount, setProductsAmount] = useState(0);

  const navigate = useNavigate();

  const handleQuantityChange = async (productId, quantity) => {
    try {
      const response = await useAxios.patch(`/cart/products/${productId}`, {
        quantity,
      });

      if (response?.status === 200) {
        setCartData((prevCartData) => {
          const updatedCart = prevCartData.map((product) => {
            return product.id === productId
              ? {
                  ...product,
                  quantity: response.data[0].quantity,
                  total_price: response.data[0].total_price,
                }
              : product;
          });

          const newTotal = updatedCart.reduce(
            (sum, product) => sum + product.total_price,
            0,
          );
          setTotalPrice(newTotal);
          setProductsAmount(() => {
            return updatedCart.reduce(
              (total, product) => total + product.quantity,
              0,
            );
          });

          return updatedCart;
        });
      }
    } catch (err) {
      console.error("Request failed with error message: " + err);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await useAxios.delete(`/cart/products/${productId}`);

      if (response?.status === 204) {
        setCartData((prevCartData) => {
          const updatedCart = prevCartData.filter(
            (product) => product.id !== productId,
          );

          const newTotal = updatedCart.reduce(
            (sum, product) => sum + product.total_price,
            0,
          );
          const newProductsAmount = updatedCart.reduce(
            (total, product) => total + product.quantity,
            0,
          );

          setTotalPrice(newTotal);
          setProductsAmount(newProductsAmount);

          return updatedCart;
        });
      }
    } catch (err) {
      console.error("Request failed with error message: " + err);
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await useAxios.get("/cart", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token") || ""}`,
          },
        });
        const data = response.data;
        setCartData(data);
        setTotalPrice(
          data.reduce((sum, product) => sum + product.total_price, 0),
        );
        setProductsAmount(() => {
          return data.reduce((total, product) => total + product.quantity, 0);
        });
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <div className="fixed top-0 right-0 z-1000 h-[1080px] w-[540px] border-l border-[#E1DFE1] bg-[#f8f6f7]">
      <div className="flex items-center justify-between px-[40px] pt-[41px]">
        <p className="h-[30px] w-[180px] text-[20px]">
          Shopping cart ({productsAmount})
        </p>
        <div
          onClick={() => setShowCart(false)}
          className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center"
        >
          <CloseIcon />
        </div>
      </div>

      <div className="flex max-h-[660px] flex-col gap-[36px] overflow-y-auto pt-[93px] pl-[40px]">
        {cartData.map((product, index) => (
          <CartProduct
            key={product.id || index}
            product={product}
            onQuantityChange={handleQuantityChange}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="absolute bottom-[40px] left-[40px] flex flex-col gap-[102px]">
        <div className="h-[110px] w-[460px] gap-[16px]">
          <div className="flex justify-between text-[16px]">
            <p>Items subtotal</p>
            <p>$ {totalPrice}</p>
          </div>
          <div className="flex justify-between text-[16px]">
            <p>Delivery</p>
            <p>$ 5</p>
          </div>
          <div className="flex justify-between text-[20px]">
            <p>Total</p>
            <p>$ {totalPrice + 5}</p>
          </div>
        </div>

        <Button
          title={"Go to checkout"}
          style="w-[460px] t-[59px] rounded-[10px] px-[60px] py-[16px] bg-[#FF4000] text-[#FFFFFF] cursor-pointer"
          onClick={() => navigate("/checkout")}
        />
      </div>
    </div>
  );
};

export default ShoppingCart;
