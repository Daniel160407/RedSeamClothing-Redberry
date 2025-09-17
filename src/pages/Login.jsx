import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import AuthorizationNavbar from "../components/navigation/AuthorizationNavbar";
import useAxios from "../hooks/UseAxios";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const response = await useAxios.post("/login", formData);
    if (response?.status === 200) {
      Cookies.set("username", response.data.user.username, { expires: 1 });
      Cookies.set("email", response.data.user.email, { expires: 1 }); //TODO: Probably change expiration date
      Cookies.set("token", response.data.token, { expires: 1 });
      navigate("/products");
    }
  };

  return (
    <>
      <AuthorizationNavbar />
      <div className="flex">
        <div className="hidden w-1/2 items-center justify-center bg-gray-100 lg:flex">
          <img
            src="/images/RegistrationImage.jpg"
            alt="Login"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex w-554 items-center justify-center p-8 lg:w-1/2">
          <div className="w-full max-w-md rounded-2xl bg-white">
            <LoginForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
