import React from "react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import {  RatingStars } from "../index";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCartLocal,
  setWishlistItem,
} from "../../localStorage/handleStorage";
import { toggleWishlist } from "../../slice/wishlistReducer";
import { addToCart, incItemCartQuantity } from "../../slice/cartReducer";
import toastNotification from "../../helper/toastNotification";

function WishlistItemCard({ item }) {
  const wishlistItems = useSelector(
    (state) => state.wishlistReducer.whislistItems
  );
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeItem = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItem(updatedWishlist);
    dispatch(toggleWishlist(item));
    toastNotification(`Removed ${item.title} from wishlist`, item.title)
  };

  const handleAddToCart = async () => {
    const cartItem = {
      id: item.id,
      title: item.title,
      price: item.discountPrice,
      quantity: 1,
      image: item.thumbnail,
      stock: item.stock,
    };

    const existingItem = cartItems.find((crun) => crun.id === item.id);

    if (existingItem) {
      if (existingItem.quantity >= existingItem.stock) {
        toastNotification(`Maximum ${existingItem.stock} items available for ${item.title}`, '', 'error')
      } else {
        const updatedCart = cartItems.map((elem) =>
          elem.id === item.id && elem.quantity < elem.stock
            ? { ...elem, quantity: elem.quantity + 1 }
            : elem
        );
        addItemToCartLocal(updatedCart);
        dispatch(incItemCartQuantity(item.id));
        toastNotification("Incrising cart Quntity", item.tilte)
      }
    } else {
      addItemToCartLocal([...cartItems, cartItem]);
      dispatch(addToCart(cartItem));
      toastNotification("Added in Cart", item.title)
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="relative w-56 md:w-60 lg:w-64 bg-white rounded-xl p-1.5 shadow-lg transition-all duration-300 hover:scale-[1.02]">
      {/* Image Container */}
      <div className="relative w-full h-40 rounded-lg mb-3 bg-rose-50 overflow-hidden">
        <NavLink to={`/shop/${item.id}`}>
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-contain p-2"
          />
        </NavLink>

        {/* Discount badge */}
        {item.discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-[#d51243] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{Math.round(item.discountPercentage)}%
          </div>
        )}
      </div>

      {/* Price */}
      <div className="absolute right-2 top-[9.5rem] bg-white text-[#d51243] font-black text-sm px-2 py-1 rounded-xl shadow-md">
        {item.discountPrice ? (
          <div className="flex items-center gap-1">
            <span className="line-through text-gray-400 text-xs">
              ₹{item.price.toFixed(2)}
            </span>
            <span>₹{item.discountPrice}</span>
          </div>
        ) : (
          <span>₹{item.price}</span>
        )}
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(item.id)}
        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-rose-50"
      >
        <FiHeart className="text-lg text-rose-600 fill-rose-600" />
      </button>

      {/* Content */}
      <div className="px-2 mb-3">
        {/* Brand & Product Name */}
        <NavLink to={`/shop/${item.id}`}>
          <div className="font-semibold text-gray-400 text-xs">
            {item.brand}
          </div>
          <h3 className="font-bold text-gray-700 text-sm mb-1 line-clamp-2">
            {item?.title.length >= 25? item.title.slice(0, 25) + '...' : item.title}
          </h3>
        </NavLink>

        {/* Rating */}
        <RatingStars rating={item.rating} />

        {/* Stock Status */}
        <div className="text-xs mb-2">
          {item.stock > 0 ? (
            <span className="text-green-600">In Stock ({item.stock})</span>
          ) : (
            <span className="text-rose-600">Out of Stock</span>
          )}
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-1 px-1 pb-1">
        <button
          onClick={handleAddToCart}
          className={`flex-1 bg-[#d51243] text-white font-bold py-2 rounded-lg border-none cursor-pointer hover:bg-rose-700 transition-colors text-sm ${
            item.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={item.stock <= 0}
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className={`w-10 bg-[#d51243] text-white font-bold py-2 rounded-lg border-none cursor-pointer hover:bg-rose-700 transition-colors flex items-center justify-center ${
            item.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={item.stock <= 0}
        >
          <FiShoppingBag className="text-white text-sm" />
        </button>
      </div>

     
    </div>
  );
}

export default WishlistItemCard;
