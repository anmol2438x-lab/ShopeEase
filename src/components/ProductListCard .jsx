import React, { useEffect, useState } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { RatingStars } from "./index";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCartLocal,
  setWishlistItem,
} from "../localStorage/handleStorage";
import { toggleWishlist } from "../slice/wishlistReducer";
import { addToCart, incItemCartQuantity } from "../slice/cartReducer";
import toastNotification from "../helper/toastNotification";

const ProductListCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state) => state.wishlistReducer.whislistItems
  );
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  // Calculate discount price
  const discountPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  useEffect(() => {
    if (wishlistItems) {
      setIsFavorite(wishlistItems.some((item) => item.id === product.id));
    }
  }, [wishlistItems]);


  // wishlist toggle handler
  const handleAddToWishlist = () => {
    const wishlistItem = {
      ...product,
      discountPrice: discountPrice,
      image: product.thumbnail,
    };

    const isAlreadyWishlisted = wishlistItems.some(
      (item) => item.id === product.id
    );

    if (isAlreadyWishlisted) {
      const updatedItems = wishlistItems.filter(
        (item) => item.id !== product.id
      );
      setWishlistItem(updatedItems);
      setIsFavorite(false);
      toastNotification("Removed from Wishlist", product.title) 
    } else {
      setWishlistItem([...wishlistItems, wishlistItem]);
      setIsFavorite(true);
      toastNotification("Added in Wishlist", product.title)
    }
    dispatch(toggleWishlist(wishlistItem));
  };


  // add to cart handler
  const handleAddToCart = async () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: discountPrice || product.price,
      quantity: 1,
      image: product.thumbnail,
      stock: product.stock,
    };

    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity >= existingItem.stock) {
        toastNotification(`Maximum ${existingItem.stock} items available for ${product.title}`, '', 'error')
      } else {
        const updatedCart = cartItems.map((item) =>
          item.id === product.id && item.quantity < item.stock
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        addItemToCartLocal(updatedCart);
        dispatch(incItemCartQuantity(product.id));
        toastNotification("Incrising cart Quntity", product.title)
      }
    } else {
      addItemToCartLocal([...cartItems, cartItem]);
      dispatch(addToCart(cartItem));
      toastNotification("Added in Cart", product.title)
    }
  };


  //buy now handler
  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="flex w-full bg-white rounded-xl p-4 shadow-lg mb-4 hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative w-48 h-48 rounded-lg bg-rose-50 overflow-hidden flex-shrink-0">
        {product.thumbnail && (
          <NavLink to={`/shop/${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-contain p-4"
            />
          </NavLink>
        )}

        {/* Discount badge */}
        {product.discountPercentage && (
          <div className="absolute top-2 left-2 bg-[#d51243] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{product.discountPercentage}%
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleAddToWishlist}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm"
        >
          <FiHeart
            className={`text-lg ${
              isFavorite ? "text-rose-600 fill-rose-600" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow pl-6 pr-2">
        {/* Brand & Product Name */}
        <div className="mb-2">
          <div className="font-bold text-gray-400 text-sm">{product.brand}</div>
          <NavLink to={`/shop/${product.id}`}>
            <h3 className="font-bold text-gray-800 text-lg mb-1">
              {product.title}
            </h3>
          </NavLink>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <RatingStars rating={product.rating} card="card" />
          </div>
          <span className="text-gray-400 text-sm">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        {/* Description on large screen */}
        {product.description && (
          <p className="text-gray-600 hidden md:block text-sm mb-4 line-clamp-3">
            {product.description}
          </p>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price & Stock */}
        <div className="mt-auto">
          <div className="flex items-center gap-3 mb-3">
            {discountPrice ? (
              <>
                <span className="text-[#d51243] font-bold text-xl">
                  ₹{discountPrice}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ₹{product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-[#d51243] font-bold text-xl">
                ₹{product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm">
              {product.stock > 0 ? (
                <span className="text-green-600">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="text-rose-600">Out of Stock</span>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="bg-[#d51243] text-white font-bold px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors text-sm"
                disabled={product.stock <= 0}
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-[#d51243] text-white font-bold px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors flex items-center gap-1 text-sm"
                disabled={product.stock <= 0}
              >
                <FiShoppingCart className="text-white text-base" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductListCard;
