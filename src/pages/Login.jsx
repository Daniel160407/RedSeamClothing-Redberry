import { Link, useNavigate } from "react-router-dom";
import useAxios from "../hooks/UseAxios";
import AuthLayout from "../components/layout/AuthLayout";
import setCookies from "../utils/SetCookies";
import { useState } from "react";
import Input from "../components/uiComponents/Input";
import validateCredentials from "../utils/ValidateCredentials";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const response = await useAxios.post("/login", formData);
      if (response?.status === 200) {
        setCookies(response.data);
        navigate("/products");
      }
    } catch (err) {
      if (err.response?.status === 422) {
        const errors = err.response.data.errors || {};

        setError({
          email: errors.email || "",
          password: errors.password || "",
        });
      } else if (err.response?.status === 401) {
        setError({
          password: "Invalid email or password",
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateCredentials(formData);

    if (
      errors.email === "" &&
      errors.username === "" &&
      errors.password === ""
    ) {
      onSubmit(formData);
    } else {
      setError(errors);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AuthLayout title={"Log in"}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[24px]">
            <Input
              value={formData.email}
              setValue={handleChange}
              name="email"
              placeholder={"Email *"}
              type={"email"}
              errorMessage={error.email ?? ""}
            />
            <Input
              value={formData.password}
              setValue={handleChange}
              name="password"
              type="password"
              placeholder="Password *"
              errorMessage={error.password ?? ""}
            />
          </div>

          <button
            type="submit"
            className="mt-[46px] h-[41px] w-full cursor-pointer rounded-[10px] bg-orange-600 px-5 py-2.5 text-white transition-all hover:bg-orange-700"
          >
            Log in
          </button>
          <p className="mt-4 w-full text-center text-[14px] text-gray-600">
            Not a memeber?{" "}
            <Link
              to={{ pathname: "/register" }}
              className="text-[#FF4000] hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default Login;
