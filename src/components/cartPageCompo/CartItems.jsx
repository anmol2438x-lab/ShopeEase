import React from "react";
import CartItemCard from "./CartItemCard";
import { useSelector } from "react-redux";

function CartItems() {
  const cartItems = useSelector(state => state.cartReducer.cartItems)

  

  return (
    <div className="lg:w-2/3">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        {/* Table Header - Visible on desktop */}
        <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 font-medium text-gray-600 border-b border-gray-200">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default CartItems;
