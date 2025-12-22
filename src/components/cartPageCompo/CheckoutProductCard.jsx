import React from "react";
import formatRupees from "../../helper/formatRupees";
import { FiShoppingBag } from "react-icons/fi";

function CheckoutProductCard({ item }) {
  return (
    <div className="flex items-start">
      <div className="w-16 h-16 bg-gray-100 rounded-lg mr-4 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <FiShoppingBag className="text-gray-400" size={20} />
        )}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{item.title}</h4>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
          <span className="font-medium">{formatRupees(item.price)}</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProductCard;
