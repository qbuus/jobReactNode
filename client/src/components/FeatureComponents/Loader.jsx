const Loader = () => {
  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-primary bg-opacity-50 z-100 flex justify-center">
        <span className="loading loading-spinner text-neutral"></span>
      </div>
    </>
  );
};

export default Loader;
