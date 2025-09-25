import Navbar from "./Navbar";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <div className="flex flex-1 items-center justify-center bg-gray-100">
          <img
            src="/images/RegistrationImage.jpg"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 items-center justify-center p-8">
          <div className="w-full max-w-[554px] rounded-2xl bg-white p-5">
            <h1 className="mb-5 text-[42px] font-semibold text-gray-800">
              {title}
            </h1>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
