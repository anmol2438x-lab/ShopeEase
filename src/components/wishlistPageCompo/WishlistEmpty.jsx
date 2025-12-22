import React from "react";
import { FiHeart } from 'react-icons/fi';
import { NavLink } from "react-router-dom";

function WishlistEmpty() {
  return (
    <div className="col-span-full text-center py-12">
      <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiHeart className="text-rose-400 text-2xl" />
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Your wishlist is empty
      </h2>
      <p className="text-gray-500 text-sm mb-4">
        Save your favorite items here
      </p>
      <NavLink to='/shop'>
      <button className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 text-sm font-medium">
        Continue Shopping
      </button>
      </NavLink>
    </div>
  );
}

export default WishlistEmpty;
