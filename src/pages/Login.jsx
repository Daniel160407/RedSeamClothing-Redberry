import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import useAxios from "../hooks/UseAxios";
import AuthLayout from "../components/layout/AuthLayout";
import setCookies from "../utils/SetCookies";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const response = await useAxios.post("/login", formData);
      if (response?.status === 200) {
        setCookies(response.data);
        navigate("/products");
      }
    } catch (err) {
      console.error("Request failed with error: " + err);
    }
  };

  return (
    <>
      <AuthLayout>
        <LoginForm onSubmit={onSubmit} />
      </AuthLayout>
    </>
  );
};

export default Login;