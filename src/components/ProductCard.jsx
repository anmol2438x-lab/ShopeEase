import React, { useEffect, useState } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCartLocal, setWishlistItem } from "../localStorage/handleStorage";
import { toggleWishlist } from "../slice/wishlistReducer";
import { addToCart, incItemCartQuantity } from "../slice/cartReducer";
import {RatingStars} from "./index";
import toastNotification from "../helper/toastNotification";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const wishlistItems = useSelector((state) => state.wishlistReducer.whislistItems);
  const cartItems = useSelector(state => state.cartReducer.cartItems)


  // Calculate discount price if available
  const discountPrice = product.discountPercentage ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2): null;



  useEffect(() => {
    if (wishlistItems) {
      setIsFavorite(wishlistItems.some((item) => item.id === product.id));
    }
  }, [wishlistItems]);



  // Add to wishlist handler
  const handleAddToWishlist = () => {
    const wishlistItem = {
      ...product,
      discountPrice: discountPrice,
      image: product.thumbnail,
    };
  

    const isAlreadyWishlisted = wishlistItems.some(item => item.id === product.id)
    if(isAlreadyWishlisted){
      const updatedItems = wishlistItems.filter(item => item.id !== product.id)
      setWishlistItem(updatedItems)
      setIsFavorite(false)
      toastNotification('Removed from Wishlist', product.title)
    }else{
      setWishlistItem([...wishlistItems, wishlistItem])
      setIsFavorite(true)
      toastNotification('Added in Wishlist', product.title)
    }

    dispatch(toggleWishlist(wishlistItem))
  };

 
  // Add to cart handler
  const handleAddToCart = async () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: discountPrice,
      quantity: 1,
      image: product.thumbnail,
      stock: product.stock,
    };    

    const existingItem = cartItems.find(item => item.id === product.id);

    if(existingItem) {
      if(existingItem.quantity >= existingItem.stock){
        toastNotification(`Maximum ${existingItem.stock} items available for ${product.title}`, '', 'error')
      }else{
        const updatedCart = cartItems.map(item => item.id === product.id && item.quantity < item.stock ? {...item, quantity: item.quantity + 1} : item)
        addItemToCartLocal(updatedCart)
        dispatch(incItemCartQuantity(product.id))
        toastNotification('Incrising cart Quntity', product.title)

      }
      
    }else{
      addItemToCartLocal([...cartItems, cartItem])
      dispatch(addToCart(cartItem))
      toastNotification('Added in Cart', product.title)
    }
   
  }


  // Buy now handler
  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="relative min-w-56 max-w-60 m-2 bg-white rounded-xl p-1.5 shadow-lg group overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-40 rounded-lg mb-4 bg-rose-50 overflow-hidden">
        {product.thumbnail && (
          <NavLink to={`/shop/${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-contain p-2 group-hover:scale-125 transition-all duration-300"
              loading="lazy"
            />
          </NavLink>
        )}

        {/* Discount badge */}
        {product.discountPercentage && (
          <div className="absolute top-2 left-2 bg-[#d51243] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{product.discountPercentage}%
          </div>
        )}
      </div>

      {/* Price */}
      <div className="absolute right-2 top-36 bg-white text-[#d51243] font-black text-sm px-2 py-1 rounded-xl shadow-md">
        {discountPrice ? (
          <div className="flex items-center gap-1">
            <span className="line-through text-gray-400 text-xs">
              ₹{product.price.toFixed(2)}
            </span>
            <span>₹{discountPrice}</span>
          </div>
        ) : (
          <span>₹{product.price.toFixed(2)}</span>
        )}
      </div>

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

      {/* Content */}
      <div className="px-2 mb-4">
        {/* Brand & Product Name */}
        <div className="font-bold text-gray-400 text-sm">{product.brand}</div>
        <NavLink to={`/shop/${product.id}`}>
          <h3
            className="font-bold text-gray-700 text-sm mb-2 line-clamp-2 group-hover:text-[#d51243] transition-all duration-300"
            title={product.title}
          >
            {product.title.length > 24
              ? product.title.slice(0, 23) + "..."
              : product.title}
          </h3>
        </NavLink>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <RatingStars rating={product.rating} card="card" />
          </div>
          <span className="text-gray-400 text-xs">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        {/* Stock Status */}
        <div className="text-xs mb-3">
          {product.stock > 0 ? (
            <span className="text-green-600">In Stock ({product.stock})</span>
          ) : (
            <span className="text-rose-600">Out of Stock</span>
          )}
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.length > 1 ? product.tags.slice(1, 3).map((tag) => (
              <span
                key={tag}
                className="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            )): (
              <span
                className="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded-full"
              >
                {product.tags[0]}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-1">
        <button onClick={handleAddToCart} className="flex-1 bg-[#d51243] text-white font-bold py-2 rounded-lg border-none cursor-pointer hover:bg-rose-700 transition-colors text-sm">
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="w-12 bg-[#d51243] text-white font-bold py-2 rounded-lg border-none cursor-pointer hover:bg-rose-700 transition-colors flex items-center justify-center"
          disabled={product.stock <= 0}
        >
          <FiShoppingCart className="text-white text-base" />
        </button>

      </div>
    </div>
  );
};

export default ProductCard;
