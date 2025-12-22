import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiX, FiShoppingCart } from 'react-icons/fi';
import { FaCartPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const AddToCartPopup = ({ show, onClose, product }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-4 right-4 z-50 animate-fadeInUp">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-80 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-green-100 px-4 py-3 border-b border-green-200">
          <div className="flex items-center">
            <FiCheckCircle className="text-green-600 text-xl mr-2" />
            <span className="font-medium text-green-800">Added to Cart</span>
          </div>
          <button 
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="text-lg" />
          </button>
        </div>
        
        {/* Product Info */}
        <div className="p-4 flex items-center">
          <div className="mr-4">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.title}
                className="w-16 h-16 object-cover rounded border border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                <FaCartPlus className="text-gray-400 text-xl" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 line-clamp-1">{product.title}</h4>
            <p className="text-gray-600 text-sm mt-1">
              {product.quantity} × ₹{(product.price * product.quantity).toFixed(2)}
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 flex justify-between border-t border-gray-200">
          <button 
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className="text-gray-700 hover:text-gray-900 text-sm font-medium"
          >
            Continue Shopping
          </button>
          <NavLink to='/cart'>
            <button 
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center"
            >
              <FiShoppingCart className="mr-2" />
              View Cart
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AddToCartPopup