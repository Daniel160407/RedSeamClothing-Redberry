import { useNavigate } from "react-router-dom";
import RegistrationForm from "../components/forms/RegistrationForm";
import useAxios from "../hooks/UseAxios";
import AuthLayout from "../components/layout/AuthLayout";
import setCookies from "../utils/SetCookies";

const Register = () => {
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const response = await useAxios.post("/register", formData);

      if (response?.status === 200) {
        setCookies(response.data);
        navigate("/products");
      }
    } catch (err) {
      console.error("Request faild with error: " + err);
    }
  };

  return (
    <>
      <AuthLayout>
        <RegistrationForm onSubmit={onSubmit} />
      </AuthLayout>
    </>
  );
};

export default Register;
