import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Input from "../components/uiComponents/Input";
import useAxios from "../hooks/UseAxios";
import Cookies from "js-cookie";
import CartProduct from "../components/model/CartProduct";
import Button from "../components/uiComponents/Button";
import SuccessLayout from "../components/layout/SuccessLayout";
import { useNavigate } from "react-router-dom";
import MailIcon from "../components/icons/MailIcon";
import validateCredentials, { isValid } from "../utils/ValidateCredentials";

const Checkout = () => {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({
    name: null,
    surname: null,
    email: null,
    address: null,
    zip_code: null,
  });
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    zip_code: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

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
          setTotalPrice(newTotal);

          return updatedCart;
        });
      }
    } catch (err) {
      console.error("Request failed with error message: " + err);
    }
  };

  const handlePayment = async () => {
    try {
      const validationResults = validateCredentials(userData);

      if (!isValid(validationResults)) {
        setErrors(validationResults);
        return;
      }

      const response = await useAxios.post(
        `/cart/checkout?name=${userData.name}&surname=${userData.surname}&email=${userData.email}&address=${userData.address}&zip_code=${userData.zip_code}`,
      );
      if (response?.status === 200) {
        setShowSuccessMessage(true);
      }
    } catch (error) {
      if (error.response?.status === 422) {
        const serverErrors = error.response.data.errors;
        const simplifiedErrors = Object.fromEntries(
          Object.entries(serverErrors).map(([key, value]) => [
            key,
            value?.[0] || value,
          ]),
        );
        setErrors(simplifiedErrors);
      }
    }
  };

  const handleSuccessMessageClose = () => {
    setShowSuccessMessage(false);
    navigate("/products");
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
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <>
      <Navbar />

      {showSuccessMessage && (
        <SuccessLayout handleClose={handleSuccessMessageClose} />
      )}

      <h1 className="font-poppins mx-30 mt-20 mb-8 text-[42px] font-semibold">
        Checkout
      </h1>

      <div className="flex gap-10">
        <div className="mx-30 mt-10 h-[40rem] w-[71rem] rounded-xl bg-[#F8F6F7] p-10">
          <div className="w-[578px] space-y-6">
            <p className="text-lg text-[22px] font-medium">Order details</p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <Input
                type="text"
                placeholder="Name"
                name="name"
                style="bg-white"
                value={userData.name}
                setValue={handleChange}
                errorMessage={errors.name ?? ""}
              />
              <Input
                type="text"
                placeholder="Surname"
                name="surname"
                style="bg-white"
                value={userData.surname}
                setValue={handleChange}
                errorMessage={errors.surname ?? ""}
              />
            </div>

            <div className="w-[578px] items-center gap-4">
              <div
                className={`flex h-[42px] w-full items-center gap-[4px] rounded-[8px] bg-white px-3 pr-10 ring-1 transition-all focus:ring-black focus:outline-0 ${errors.email ? "ring-[#FF4000]" : "ring-[#E1DFE1]"}`}
              >
                <MailIcon />
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  className={`h-full w-full outline-none`}
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <p className="mt-1 ml-1 text-sm text-[#FF4000]">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Input
                type="text"
                placeholder="Address"
                name="address"
                style="bg-white"
                value={userData.address}
                setValue={handleChange}
                errorMessage={errors.address ?? ""}
              />
              <Input
                type="text"
                placeholder="Zip code"
                name="zip_code"
                style="bg-white"
                value={userData.zip_code}
                setValue={handleChange}
                errorMessage={errors.zip_code ?? ""}
              />
            </div>
          </div>
        </div>

        {cartData.length > 0 && (
          <div>
            <div className="flex max-h-[304px] flex-col gap-[36px] overflow-y-auto">
              {cartData.map((product, index) => (
                <CartProduct
                  key={index}
                  product={product}
                  onQuantityChange={handleQuantityChange}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            <div className="mt-30 flex flex-col gap-[16px]">
              <div className="flex justify-between text-[16px]">
                <p>Items subtotal</p>
                <p>$ {totalPrice}</p>
              </div>
              <div className="flex justify-between text-[16px]">
                <p>Delivery</p>
                <p>$ 5</p>
              </div>
              <div className="text-medium flex justify-between text-[20px]">
                <p>Total</p>
                <p>$ {totalPrice + 5}</p>
              </div>
            </div>

            <Button
              title="Pay"
              style="w-full rounded-[10px] py-[16px] px-[60px] bg-[#FF4000] text-white mt-20 cursor-pointer"
              onClick={handlePayment}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
