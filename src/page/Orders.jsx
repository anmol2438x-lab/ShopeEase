import React, { useState } from "react";
import {
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiPackage,
  FiSearch,
  FiChevronDown,
  FiMapPin,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { OrderCard } from "../components";

const OrdersPage = () => {
  // local states
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllOrders, setShowAllOrders] = useState(false);

  // handle store values
  const orders = useSelector((state) => state.orderReducer.orders);

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === "all" || order.status === filter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

 
  //how much orders to display
  const displayedOrders = showAllOrders
    ? filteredOrders
    : filteredOrders.slice(0, 10);

  const getStatusDetails = (status) => {
    switch (status) {
      case "processing":
        return {
          color: "bg-amber-50 text-amber-800 border-amber-200",
          icon: <FiClock className="text-amber-500" size={18} />,
          text: "Processing",
          description: "Your order is being prepared",
        };
      case "shipped":
        return {
          color: "bg-blue-50 text-blue-800 border-blue-200",
          icon: <FiTruck className="text-blue-500" size={18} />,
          text: "Shipped",
          description: "Your order is on the way",
        };
      case "reach":
        return {
          color: "bg-purple-50 text-purple-800 border-purple-200",
          icon: <FiMapPin className="text-purple-500" size={18} />,
          text: "Reached",
          description: "Your order has arrived in your area",
        };
      case "delivered":
        return {
          color: "bg-green-50 text-green-800 border-green-200",
          icon: <FiCheckCircle className="text-green-500" size={18} />,
          text: "Delivered",
          description:
            "Delivered on " +
            new Date().toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
        };
      case "cancelled":
        return {
          color: "bg-red-50 text-red-800 border-red-200",
          icon: <FiPackage className="text-red-500" size={18} />,
          text: "Cancelled",
          description: "Order was cancelled",
        };
      default:
        return {
          color: "bg-gray-50 text-gray-800 border-gray-200",
          icon: <FiPackage size={18} />,
          text: "Unknown",
          description: "",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Order History
          </h1>
          <p className="text-gray-600">View and manage your recent purchases</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {[
                "all",
                "processing",
                "shipped",
                "reach",
                "delivered",
                "cancelled",
              ].map((status) => {
                const statusInfo = getStatusDetails(status);
                return (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center space-x-2 transition-all ${
                      filter === status
                        ? "bg-[#d51243] text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {status === "all"
                      ? null
                      : React.cloneElement(statusInfo.icon, { size: 16 })}
                    <span>
                      {status === "all" ? "All Orders" : statusInfo.text}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders or products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d51243]/50 focus:border-transparent bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Orders List*/}
        <div className="space-y-5">
          {displayedOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-8 text-center">
              <FiShoppingBag className="mx-auto text-4xl text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                No orders found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchQuery
                  ? "We couldn't find any orders matching your search."
                  : "You haven't placed any orders yet. Start shopping to see orders here."}
              </p>
              <NavLink to="/shop">
                <button className="mt-4 px-6 py-2.5 bg-[#d51243] text-white rounded-lg font-medium hover:bg-[#b30f3a] transition-colors">
                  Start Shopping
                </button>
              </NavLink>
            </div>
          ) : (
            <>
              {displayedOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  getStatusDetails={getStatusDetails}
                  expandedOrder={expandedOrder}
                  setExpandedOrder={setExpandedOrder}
                />
              ))}

              {/* Show More/Less button */}
              {filteredOrders.length > 10 && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setShowAllOrders(!showAllOrders)}
                    className="flex items-center gap-2 px-5 py-2.5 text-[#d51243] bg-white border border-[#d51243] rounded-lg hover:bg-[#d51243]/10 transition-colors"
                  >
                    {showAllOrders ? (
                      <>
                        <FiChevronDown className="transform rotate-180" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <FiChevronDown />
                        Show All ({filteredOrders.length} orders)
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;
