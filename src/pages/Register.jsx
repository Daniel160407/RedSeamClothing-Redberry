import { useNavigate } from "react-router-dom";
import RegistrationForm from "../components/forms/RegistrationForm";
import useAxios from "../hooks/UseAxios";
import Cookies from "js-cookie";
import AuthLayout from "../components/layout/AuthLayout";

const Register = () => {
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const response = await useAxios.post("/register", formData);

    if (response?.status === 200) {
      Cookies.set("username", response.data.user.username, { expires: 1 });
      Cookies.set("email", response.data.user.email, { expires: 1 }); //TODO: Probably change expiration date
      Cookies.set("profile_photo", response.data.profile_photo, { expires: 1 });
      Cookies.set("token", response.data.token, { expires: 1 });
      navigate("/products");
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
