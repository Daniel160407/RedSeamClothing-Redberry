const PulsingInfo = () => {
  return (
    <div className="p-4">
      <div className="animate-pulse">
        <div className="mb-4 h-8 w-3/4 rounded bg-gray-200"></div>
        <div className="mb-4 h-6 w-1/4 rounded bg-gray-200"></div>
        <div className="mb-2 h-4 w-1/2 rounded bg-gray-200"></div>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-5 w-5 rounded-full bg-gray-200"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PulsingInfo;
