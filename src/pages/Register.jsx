import RegistrationForm from "../components/forms/RegistrationForm";
import AuthorizationNavbar from "../components/navigation/AuthorizationNavbar";
import useAxios from "../hooks/UseAxios";
import Cookies from "js-cookie";

const Register = () => {
  const onSubmit = async (formData) => {
    const response = await useAxios.post("/register", formData);

    if (response?.status === 200) {
      Cookies.set("username", response.data.user.username, { expires: 1 });
      Cookies.set("email", response.data.user.email, { expires: 1 }); //TODO: Probably change expiration date
      Cookies.set("token", response.data.token, { expires: 1 });
    }
  };

  return (
    <>
      <AuthorizationNavbar />
      <div className="flex">
        <div className="hidden w-1/2 items-center justify-center bg-gray-100 lg:flex">
          <img
            src="/images/RegistrationImage.jpg"
            alt="Register"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
          <div className="w-full max-w-md rounded-2xl bg-white p-8">
            <RegistrationForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
