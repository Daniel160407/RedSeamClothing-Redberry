import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import useAxios from "../hooks/UseAxios";
import AuthLayout from "../components/layout/AuthLayout";
import setCookies from "../utils/SetCookies";
import { useState } from "react";

const Login = () => {
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

  return (
    <>
      <AuthLayout title={"Log in"}>
        <LoginForm onSubmit={onSubmit} error={error} setError={setError} />
      </AuthLayout>
    </>
  );
};

export default Login;
