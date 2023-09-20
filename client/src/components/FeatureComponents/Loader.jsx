const Loader = () => {
  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 z-100 flex justify-center">
        <span className="loading loading-spinner text-neutral-content loading-lg"></span>
      </div>
    </>
  );
};

export default Loader;
