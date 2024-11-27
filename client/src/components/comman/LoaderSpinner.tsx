const LoaderSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white mb-4"></div>
        <p className="text-white text-lg">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoaderSpinner;
