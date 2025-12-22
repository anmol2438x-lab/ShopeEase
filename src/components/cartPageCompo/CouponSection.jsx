import React, { useEffect, useState } from "react";
import { FiTag, FiCheck, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setAppliedCoupon } from "../../slice/cartReducer";
import { setAppliedCouponInLocal } from "../../localStorage/handleStorage";

function CouponSection() {
  const dispatch = useDispatch();
  const {
    cartItems,
    appliedCoupon,
    cartSummary: { subtotal },
  } = useSelector((state) => state.cartReducer);

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  // Available coupons
  const availableCoupons = [
    { code: "WELCOME10", discount: 10, type: "percentage", minOrder: 250 },
    { code: "MEMBERSHIP", discount: 199, type: "fixed", minOrder: 450 },
    { code: "SAVE20", discount: 20, type: "percentage", minOrder: 800 },
  ];


  // Coupon handlers
  const handleApplyCoupon = () => {
    setCouponError("");
    const coupon = availableCoupons.find(
      (c) => c.code === couponCode.toUpperCase()
    );

    if (!coupon) {
      setCouponError("Invalid coupon code");
      return;
    }

    if (subtotal < coupon.minOrder) {
      setCouponError(`Minimum order of ₹${coupon.minOrder} required`);
      return;
    }

    dispatch(setAppliedCoupon(coupon));
  };

  const handleRemoveCoupon = () => {
    dispatch(setAppliedCoupon(null));
    setCouponCode("");
  };

  return (
    <div className="mb-8 bg-rose-50 rounded-lg p-4 border border-rose-100">
      <h3 className="font-medium text-lg mb-3 flex items-center">
        <FiTag className="mr-2 text-[#d51243]" /> Available Coupons
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {availableCoupons.map((coupon) => (
          <div
            key={coupon.code}
            className={`p-3 rounded-md border ${
              appliedCoupon?.code === coupon.code
                ? "bg-rose-100 border-[#d51243]"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">{coupon.code}</span>
                <p className="text-sm text-gray-600">
                  {coupon.type === "percentage"
                    ? `${coupon.discount}% off`
                    : `₹${coupon.discount} off`}
                </p>
                <p className="text-xs text-gray-500">
                  Min. order ₹{coupon.minOrder}
                </p>
              </div>
              {appliedCoupon?.code === coupon.code ? (
                <button
                  onClick={handleRemoveCoupon}
                  className="text-[#d51243] hover:text-rose-800"
                >
                  <FiX />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setCouponCode(coupon.code);
                    handleApplyCoupon();
                  }}
                  className="text-[#d51243] hover:text-rose-800"
                  disabled={subtotal < coupon.minOrder}
                >
                  <FiCheck />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent"
        />
        {appliedCoupon ? (
          <button
            onClick={handleRemoveCoupon}
            className="px-6 py-2 bg-white text-[#d51243] border border-[#d51243] rounded-md hover:bg-rose-50 transition-colors"
          >
            Remove Coupon
          </button>
        ) : (
          <button
            onClick={handleApplyCoupon}
            className="px-6 py-2 bg-[#d51243] text-white rounded-md hover:bg-rose-700 transition-colors"
          >
            Apply Coupon
          </button>
        )}
      </div>
      {couponError && (
        <p className="mt-2 text-sm text-red-600">{couponError}</p>
      )}
    </div>
  );
}

export default CouponSection;
