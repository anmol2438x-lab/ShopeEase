import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="text-center py-12">
      <FiShoppingCart className="mx-auto text-5xl text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-gray-600 mb-6">
        Looks like you haven't added any items to your cart yet.
      </p>
      <NavLink
        to="/shop"
        className="bg-[#d51243] hover:bg-rose-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
      >
        Start Shopping
      </NavLink>
    </div>
  );
}

export default EmptyCart;
