const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <img
        style={{ objectFit: "contain", height: "120px" }}
        src="/assets/logo.png"
        alt="Logo"
        className="  animate-pulse"
        loading="lazy"
      />
    </div>
  );
};

export default LoadingPage;
