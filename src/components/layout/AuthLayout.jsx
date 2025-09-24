import AuthorizationNavbar from "./AuthorizationNavbar";

const AuthLayout = ({ title, children }) => {
  return (
    <>
      <AuthorizationNavbar />
      <div className="flex">
        <div className="hidden w-1/2 items-center justify-center bg-gray-100 lg:flex">
          <img
            src="/images/RegistrationImage.jpg"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex w-[554px] items-center justify-center p-8 lg:w-1/2">
          <div className="w-full max-w-md rounded-2xl bg-white">
            <div className="mx-auto w-[554px] p-5">
              <h1 className="mb-5 text-[42px] font-semibold text-gray-800">
                {title}
              </h1>

              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
