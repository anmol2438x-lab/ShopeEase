import React from "react";
import {
  FiShoppingBag,
  FiCheckCircle,
  FiCalendar,
  FiChevronDown,
  FiCreditCard,
  FiMapPin,
  FiTruck,
  FiPackage,
} from "react-icons/fi";
import { FaPaypal, FaApplePay, FaGooglePay, FaRupeeSign } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../slice/orderReducer";
import formatRupees from "../../helper/formatRupees";
import { CheckoutProductCard } from "..";
import { updateCart } from "../../slice/cartReducer";
import toastNotification from "../../helper/toastNotification";
import { addItemToCartLocal } from "../../localStorage/handleStorage";

function OrderCard({
  order,
  getStatusDetails,
  expandedOrder,
  setExpandedOrder,
}) {
  const dispatch = useDispatch();

  const getPaymentIcon = (method) => {
    const icons = {
      paypal: <FaPaypal className="text-blue-500" size={18} />,
      applePay: <FaApplePay className="text-black" size={18} />,
      creditCard: <FiCreditCard className="text-gray-600" size={18} />,
      cod: <FiShoppingBag className="text-gray-600" size={18} />,
      upi: <FaGooglePay className="text-purple-600" size={18} />,
      default: <FaRupeeSign className="text-gray-600" size={18} />,
    };
    return icons[method] || icons.default;
  };

  const getStatusIcon = (status) => {
    const icons = {
      processing: <FiPackage className="mr-1.5" size={14} />,
      shipped: <FiTruck className="mr-1.5" size={14} />,
      reach: <FiMapPin className="mr-1.5" size={14} />,
      delivered: <FiCheckCircle className="mr-1.5" size={14} />,
      cancelled: <FiCheckCircle className="mr-1.5" size={14} />,
      default: <FiShoppingBag className="mr-1.5" size={14} />,
    };
    return icons[status] || icons.default;
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getOrderTrackStep = (status) => {
    const steps = {
      processing: "Order processed",
      shipped: "Shipped",
      reach: "Out for delivery",
      delivered: "Delivered",
      default: status,
    };
    return steps[status] || steps.default;
  };

  const handleStatusChange = (e, id) => {
    const newStatus = e.target.value;
    dispatch(updateStatus({ id, status: newStatus }));

    let message = "";

    switch (newStatus) {
      case "processing":
        message = `Your order #${id} is being prepared.`;
        break;
      case "shipped":
        message = `Your order #${id} is on the way!`;
        break;
      case "reach":
        message = `Your order #${id} has arrived in your area.`;
        break;
      case "delivered":
        message = `Your order #${id} has been successfully delivered!`;
        break;
      case "cancelled":
        message = `Your order #${id} has been cancelled.`;
        break;
      default:
        message = `Order #${id} status updated.`;
    }

    toastNotification(message);
  };

  const formatPaymentMethod = (method) => {
    const methods = {
      creditCard: `Credit Card ending in ${order.paymentMethod.creditCard.cardNumber.slice(
        -4
      )}`,
      paypal: "PayPal",
      applePay: "Apple Pay",
      cod: "Cash On Delivery",
      upi: "UPI Payment",
      default: "Other payment method",
    };
    return methods[method] || methods.default;
  };

  const buyAgain = (id) => {
    if (order.id === id) {
      dispatch(updateCart(order.items));
      addItemToCartLocal(order.items);
      toastNotification("Order items Added in Cart", `Order id: ${order.id}`);
    }
  };

  const statusInfo = getStatusDetails(order.status);
  const isExpanded = expandedOrder === order.id;

  return (
    <div
      className={`bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden transition-all duration-200 ${
        isExpanded ? "ring-2 ring-[#d51243]/30 shadow-sm" : "hover:shadow-sm"
      }`}
    >
      {/* Order Header */}
      <div className="border-b border-gray-100 p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3 className="font-bold text-gray-900 text-lg">
                Order #{order.id}
              </h3>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-medium ${statusInfo.color} border flex items-center`}
              >
                {getStatusIcon(order.status)}
                <span>{statusInfo.text}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-1.5">
                <FiCalendar className="text-gray-400" size={14} />
                <span>Placed on {order.date}</span>
              </div>

              {order.deliveryDate && order.status === "delivered" && (
                <div className="flex items-center space-x-1.5">
                  <FiCheckCircle className="text-green-500" size={14} />
                  <span>Delivered on {order.deliveryDate}</span>
                </div>
              )}

              <div className="flex items-center space-x-1.5">
                <span>{formatRupees(order.orderSummary.total)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => toggleOrderExpand(order.id)}
              className="text-[#d51243] flex items-center font-medium text-sm hover:text-[#b30f3a] transition-colors"
              aria-label={
                isExpanded ? "Hide order details" : "View order details"
              }
            >
              <span>{isExpanded ? "Hide details" : "View details"}</span>
              <FiChevronDown
                className={`ml-1.5 transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Order Details */}
      {isExpanded && (
        <div className="border-b border-gray-100">
          {/* Order Items */}
          <div className="p-5 md:p-6">
            <h4 className="font-medium text-gray-900 mb-4 text-lg">
              Items in this order
            </h4>
            <div className="space-y-5">
              {order.items.map((item) => (
                <CheckoutProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Address */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-lg">
                  Shipping Address
                </h4>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
                  <div className="flex items-start">
                    <FiMapPin className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="font-medium">
                        {order.shippingAddress.name}
                      </p>
                      <p className="text-gray-600">
                        {order.shippingAddress.street}
                      </p>
                      <p className="text-gray-600">
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}{" "}
                        {order.shippingAddress.zip}
                      </p>
                      <p className="text-gray-600">
                        {order.shippingAddress.country}
                      </p>
                      {order.shippingAddress.phone && (
                        <p className="text-gray-600">
                          Phone: {order.shippingAddress.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment & Order Summary */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-lg">
                  Payment & Summary
                </h4>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs space-y-4">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {getPaymentIcon(order.paymentMethod.type)}
                    </div>
                    <div>
                      <p className="font-medium">
                        {formatPaymentMethod(order.paymentMethod.type)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Paid on {order.date}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatRupees(order.orderSummary.subtotal)}</span>
                    </div>
                    {order.orderSummary.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Discount({" "}
                          <span className="text-green-600">
                            {order.appliedCoupon.code}
                          </span>{" "}
                          )
                        </span>
                        <span className="text-green-600">
                          -{formatRupees(order.orderSummary.discount)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span>
                        {order.orderSummary.shipping > 0
                          ? `₹${order.orderSummary.shipping.toLocaleString()}`
                          : "Free"}
                      </span>
                    </div>
                    {order.orderSummary.tax > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax</span>
                        <span>{formatRupees(order.orderSummary.tax)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-medium pt-2 mt-2 border-t border-gray-100">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">
                        {formatRupees(order.orderSummary.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Information (if available) */}
          {order.tracking && (
            <div className="p-5 md:p-6 border-t border-gray-100">
              <div
                className={`flex items-center justify-between ${
                  order.status !== "cancelled" ? "mb-4" : ""
                }`}
              >
                <h4 className="font-medium text-gray-900 text-lg">
                  Tracking Information
                </h4>
                {order.tracking.url && (
                  <a
                    href={order.tracking.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#d51243] hover:text-[#b30f3a] font-medium"
                  >
                    Track on carrier website
                  </a>
                )}
              </div>

              {order.status !== "cancelled" && (
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
                  <div className="mb-4 last:mb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                      <div>
                        <p className="text-sm font-medium">
                          {order.tracking.carrier}
                        </p>
                        <p className="text-sm text-gray-500">
                          Tracking #: {order.tracking.number}
                        </p>
                      </div>
                      {order.tracking.estimatedDelivery && (
                        <div className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-lg">
                          Estimated delivery: {order.tracking.estimatedDelivery}
                        </div>
                      )}
                    </div>

                    <div className="relative pl-5">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 ml-1.5"></div>
                      {order.tracking.steps.map((step, index) => (
                        <div key={index} className="relative pb-4 last:pb-0">
                          <div
                            className={`absolute -left-5 top-0 w-3 h-3 rounded-full ${
                              getOrderTrackStep(order.status) === step.status
                                ? "bg-[#d51243] border-2 border-[#d51243]/20"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <div className="pl-2">
                            <p className="text-sm font-medium">{step.status}</p>
                            <p className="text-xs text-gray-500">
                              {step.date} · {step.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Order Footer */}
      <div className="bg-gray-50 px-5 py-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-sm text-gray-500">{statusInfo.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2 whitespace-nowrap">
                Update Status:
              </span>
              <select
                name="status"
                className="border cursor-pointer border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d51243]/50 transition-all text-sm"
                value={order.status}
                onChange={(e) => handleStatusChange(e, order.id)}
              >
                {[
                  "processing",
                  "shipped",
                  "reach",
                  "delivered",
                  "cancelled",
                ].map((status) => (
                  <option
                    key={status}
                    value={status}
                    className="text-gray-900 capitalize"
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="px-4 py-2 bg-[#d51243] text-white rounded-lg text-sm font-medium hover:bg-[#b30f3a] transition-colors whitespace-nowrap"
              onClick={() => buyAgain(order.id)}
            >
              Buy Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
