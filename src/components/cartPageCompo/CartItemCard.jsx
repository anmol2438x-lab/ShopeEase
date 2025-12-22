import React from "react";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { decItemCartQuantity, incItemCartQuantity, removeFromCart } from "../../slice/cartReducer";
import { addItemToCartLocal } from "../../localStorage/handleStorage";
import { NavLink } from "react-router-dom";
import toastNotification from "../../helper/toastNotification";

function CartItemCard({item}) {
  const cartItems = useSelector(state => state.cartReducer.cartItems)
  const dispatch = useDispatch()
  
  

  // Handlers for cart actions
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    addItemToCartLocal(updatedCart)
    dispatch(removeFromCart(id))
    toastNotification("Removed from cart", item.title) 
    
    
  };

  const handleIncreaseQuantity = (id) => {
    const updatedQuantity = cartItems.map(item => item.id === id && item.quantity < item.stock ? {...item, quantity: item.quantity + 1} : item)
    addItemToCartLocal(updatedQuantity)
    dispatch(incItemCartQuantity(id))
  };

  const handleDecreaseQuantity = (id) => {
    const updatedQuantity = cartItems.map(item => item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item)
    addItemToCartLocal(updatedQuantity)
    dispatch(decItemCartQuantity(id))
  };






  return (
    <div
      
      className="p-4 border-b border-gray-100 grid grid-cols-6 md:grid-cols-12 items-center gap-3 hover:bg-gray-50 transition-colors"
    >
      {/* Product Info */}
      <div className="col-span-4 md:col-span-6 flex items-start space-x-3">
        <div className="relative flex-shrink-0">
          <NavLink to={`/shop/${item.id}`}>
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-contain rounded-md bg-gray-100 border border-gray-200"
            />
          </NavLink>
        </div>
        <div className="min-w-0">
          <NavLink to={`/shop/${item.id}`}>
            <h3 className="font-medium text-gray-900 line-clamp-2">
              {item.title}
            </h3>
          </NavLink>
          <div className="flex items-center mt-1 space-x-4">
            <span
              className={`text-xs ${
                item.stock > 0 ? "text-green-600" : "text-rose-600"
              }`}
            >
              {item.stock > 0 ? `Stock: ${item.stock}` : "Out of stock"}
            </span>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-rose-500 hover:text-rose-700 text-xs flex items-center"
            >
              <FiTrash2 className="mr-1" /> Remove
            </button>
          </div>
        </div>
      </div>

      {/* Price - Mobile first */}
      <div className="col-span-2 md:col-span-2 flex md:block justify-end">
        <div className="text-right md:text-center">
          <span className="font-medium text-gray-900 block">
            ₹{item.price}
          </span>
          {item.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{item.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="col-span-4 md:col-span-2 flex justify-center">
        <div className="inline-flex items-center border border-gray-200 rounded-md">
          <button
            onClick={() => handleDecreaseQuantity(item.id)}
            className={`px-2.5 py-1.5 text-gray-500 hover:bg-gray-100 ${
              item.quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={item.quantity <= 1}
          >
            <FiMinus size={14} />
          </button>
          <span className="px-2.5 py-1.5 text-sm font-medium w-8 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => handleIncreaseQuantity(item.id)}
            className={`px-2.5 py-1.5 text-gray-500 hover:bg-gray-100 ${
              item.quantity >= item.stock ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={item.quantity >= item.stock}
          >
            <FiPlus size={14} />
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="col-span-2 flex justify-end">
        <div className="text-right">
          <span className="font-medium text-gray-900 block">
            ₹{(item.price * item.quantity).toFixed(2)}
          </span>
          {item.originalPrice && (
            <span className="text-xs text-green-600">
              Save ₹
              {((item.originalPrice - item.price) * item.quantity).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
