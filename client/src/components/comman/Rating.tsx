import { StarIcon } from "@heroicons/react/24/solid";
import React from "react";

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, idx) => (
        <StarIcon key={idx} className={`h-5 w-5 ${idx < rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-500"}`} />
      ))}
    </div>
  );
};

export default Rating;
