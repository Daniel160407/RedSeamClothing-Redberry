const SubmitBtn = ({ text }) => {
  return (
    <button
      type="submit"
      className="mt-6 w-[554px] h-[41px] cursor-pointer rounded-[10px] bg-orange-600 px-5 py-2.5 text-white hover:bg-orange-700"
    >
      {text}
    </button>
  );
};

export default SubmitBtn;
