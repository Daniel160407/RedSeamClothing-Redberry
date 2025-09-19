const NavLoginBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center gap-[20px] rounded-lg px-4 py-2 transition-colors duration-200"
    >
      <img
        src="/svg/default_avatar.svg"
        alt="avatar"
        className="h-6 w-6 text-[12px]"
      />
      <span className="font-medium">Log In</span>
    </button>
  );
};

export default NavLoginBtn;
