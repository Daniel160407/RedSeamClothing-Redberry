const NavLoginBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
    >
      <img src="/svg/default_avatar.svg" alt="avatar" className="w-6 h-6" />
      <span className="font-medium">Log In</span>
    </button>
  );
};

export default NavLoginBtn;
