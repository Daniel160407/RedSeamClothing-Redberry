const SubmitBtn = ({ text }) => {
  return (
    <button
      type="submit"
      className="mt-6 w-full cursor-pointer rounded-md bg-orange-600 py-2 text-white hover:bg-orange-700"
    >
      {text}
    </button>
  );
};

export default SubmitBtn;
