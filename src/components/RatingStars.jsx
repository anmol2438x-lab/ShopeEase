import React from "react";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";

function RatingStars({ rating = 0, card = "" }) {

  // best aproch
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;

    return (
      <span className="text-yellow-500" key={index}>
        {rating >= index + 1 ? (
          <FaStar />
        ) : rating >= number ? (
          <FaRegStarHalfStroke />
        ) : (
          <FaRegStar />
        )}
      </span>
    );
  });


  // my aproch
  const stars = [...Array(5)].map((_, index) => {
    let number = index + 0.5;

    return (
      <span className="text-yellow-500" key={index}>
        {rating >= index + 1 ? (
          <FaStar />
        ) : rating >= number ? (
          <FaRegStarHalfStroke />
        ) : (
          <FaRegStar />
        )}
      </span>
    );
  });

  // Determine color based on rating
  const getColor = () => {
    if (rating >= 4) return "bg-green-500";
    if (rating >= 3) return "bg-yellow-500";
    if (rating >= 2) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="flex items-center gap-1">
      {/* Star display */}
      {!card && (
        <div
          className={`flex items-center px-2 py-1 rounded-md ${getColor()} text-white`}
        >
          <span className="mr-1 font-medium">{rating.toFixed(1)}</span>
          <FaStar className="text-white" />
        </div>
      )}

      {/* Visual star rating */}
      <div className="flex ml-2">{stars}</div>
    </div>
  );
}

export default RatingStars;
