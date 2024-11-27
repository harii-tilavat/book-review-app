const LoadingCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-100 animate-pulse">
      {/* Book Cover Placeholder */}
      <div className="h-48 w-full bg-gray-100 dark:bg-gray-700"></div>

      {/* Book Details Placeholder */}
      <div className="p-4">
        <div className="h-7 bg-gray-100 dark:bg-gray-700 rounded mb-3"></div>
        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-1/3  mb-2"></div>
        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-1/3"></div>

        {/* Rating Section Placeholder */}
        <div className="mt-3 flex items-center">
          <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-5 w-5 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
            ))}
          </div>
          <div className="ml-2 h-4 w-8 bg-gray-100 dark:bg-gray-700 rounded"></div>
          <div className="ms-auto h-4 w-14 bg-gray-100 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Actions Placeholder */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="h-4 w-20 bg-gray-100 dark:bg-gray-700 rounded"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-12 bg-gray-100 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-12 bg-gray-100 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
