import React from "react";
import { NavLink } from "react-router-dom";

function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Product Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <NavLink
          to="/shop"
          className="bg-[#d51243] text-white px-6 py-2 rounded-lg hover:bg-[#b3103a] transition-colors"
        >
          Continue Shopping
        </NavLink>
      </div>
    </div>
  );
}

export default ProductNotFound;
