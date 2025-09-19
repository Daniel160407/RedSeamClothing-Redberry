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
      const { user, token} = response.data;
      Cookies.set("username", user.username, { expires: 1 });
      Cookies.set("email", user.email, { expires: 1 }); //TODO: Probably change expiration date
      Cookies.set("token", token, { expires: 1 });
      if (user.avatar) {
        Cookies.set("profile_photo", user.avatar, { expires: 1 });
      }
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
