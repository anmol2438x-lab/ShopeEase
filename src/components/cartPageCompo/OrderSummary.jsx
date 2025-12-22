import React from "react";
import { NavLink } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { CheckoutProductCard } from "..";
import { useSelector } from "react-redux";

function OrderSummary({
  toggleCart,
  setToggleCart
}) {
  const {cartItems, appliedCoupon, cartSummary : { subtotal, discount, shipping, total, tax}} = useSelector(state => state.cartReducer)


  return (
    <div className="lg:w-1/3">
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-16">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>

        {toggleCart !== "cart" && (
          <>          
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {cartItems?.map((item) => (
                <CheckoutProductCard key={item.id} item={item} />
              ))}
            </div>
            <hr className="mb-3"/>
          </>
        )} 

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          {appliedCoupon && (
            <div className="flex justify-between text-[#d51243]">
              <span>Discount ({appliedCoupon.code})</span>
              <span>-₹{discount}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>
              {shipping === 0 ? (
                <span className="text-[#d51243]">Free</span>
              ) : (
                `₹${shipping}`
              )}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>₹{tax}</span>
          </div>

          <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {toggleCart === "cart" && (
          <button
            className="w-full bg-[#d51243] hover:bg-rose-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 mb-4"
            onClick={() => setToggleCart("chechout")}
          >
            Proceed to Checkout
          </button>
        )}

        <p className="text-sm text-gray-500 text-center">
          or{" "}
          <NavLink to="/shop" className="text-[#d51243] hover:underline">
            continue shopping
          </NavLink>
        </p>

        <div className="flex items-center justify-center mt-3 text-sm text-gray-500">
          <FiLock className="text-[#d51243] mr-2" />
          <span>Secure checkout powered by ShopEase</span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
