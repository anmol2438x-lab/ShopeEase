import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RatingStars } from "../index";

import { toggleWishlist } from "../../slice/wishlistReducer";
import { addToCart, incItemCartQuantity, decItemCartQuantity } from "../../slice/cartReducer";

import {
  addItemToCartLocal,
  setWishlistItem,
} from "../../localStorage/handleStorage";

import {
  FiShoppingCart,
  FiHeart,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiShare2,
  FiEye,
  FiTag,
  FiAward,
  FiAlertCircle,
  FiCheck,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import toastNotification from "../../helper/toastNotification";

function ProductDataInfo({productData}) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const wishlistItems = useSelector(
    (state) => state.wishlistReducer.whislistItems
  );
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [viewsCount, setViewsCount] = useState(0);

  // set product viewsCount & quantity
  useEffect(() => {
    setViewsCount(Math.round(Math.random() * 1000));
    if(cartItems){
      cartItems.map(item => item.id === productData.id ? setQuantity(item.quantity) : 1)
    }
    
  }, []);

  // Check if product is in wishlist
  useEffect(() => {
    if (productData && wishlistItems) {
      setIsWishlisted(wishlistItems.some((item) => item.id === productData.id));
    }
  }, [productData, wishlistItems]);

  // Quantity handlers
  const handleQuantity = (action) => {
    if (action === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
      const updatedCart = cartItems.map(item => item.id === productData.id ? {...item, quantity: item.quantity - 1} : item )
      addItemToCartLocal(updatedCart)
      dispatch(decItemCartQuantity(productData.id))
           
    } else if (action === "inc" && quantity < productData?.stock) {
      setQuantity((prev) => prev + 1);
      const updatedCart = cartItems.map(item => item.id === productData.id ? {...item, quantity: item.quantity + 1} : item )
      addItemToCartLocal(updatedCart)
      dispatch(incItemCartQuantity(productData.id)) 
    }
  };

  // Calculate discounted price
  const discountedPrice = (
    productData?.price -
    (productData?.price * productData?.discountPercentage) / 100
  ).toFixed(2);

  // Add to cart handler
  const handleAddToCart = async () => {
    const cartItem = {
      id: productData.id,
      title: productData.title,
      price: discountedPrice,
      quantity,
      image: productData.images[0],
      stock: productData.stock,
    };

    if (cartItems.some((item) => item.id === productData.id)) {
      const updatedCart = cartItems.map((item) => item.id === productData.id  ? cartItem : item );


      addItemToCartLocal(updatedCart);
      dispatch(addToCart(cartItem));
      toastNotification('Updating Cart Item', productData.title)
    } else {
      addItemToCartLocal([...cartItems, cartItem]);
      dispatch(addToCart(cartItem));
      toastNotification('Added in Cart', product.title)
    }
  };

  // Buy now handler
  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/cart");
  };

  // Add to wishlist handler
  const handleAddToWishlist = () => {
    const wishlistItem = {
      ...productData,
      discountPrice: discountedPrice,
      image: productData.images[0],
    };

    const isAlreadyWishlisted = wishlistItems.some(
      (item) => item.id === productData.id
    );

    if (isAlreadyWishlisted) {
      const updatedWishlist = wishlistItems.filter((item) => item.id !== productData.id );
      setWishlistItem(updatedWishlist);
      setIsWishlisted(false);
      toastNotification('Removed from Wishlist', productData.title)


    } else {
      setWishlistItem([...wishlistItems, wishlistItem]);
      setIsWishlisted(true);
      toastNotification('Added in Wishlist', productData.title)
    }

    dispatch(toggleWishlist(wishlistItem));
  };

  // Share product handler
  const handleShareProduct = () => {
    if (navigator.share) {
      navigator
        .share({
          title: productData.title,
          text: `Check out ${productData.title} on our store`,
          url: window.location.href,
        })
    } else {
      navigator.clipboard.writeText(window.location.href);      
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Product Image Gallery */}
      <div className="lg:w-1/2">
        <div className="relative bg-rose-50 rounded-xl p-4 flex items-center justify-center h-96 mb-4">
          <img
            src={productData.images[currentImageIndex]}
            alt={productData.title}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />

          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleShareProduct}
              className="bg-white p-2 rounded-full shadow-md hover:bg-rose-100 hover:text-[#d51243] transition-colors"
              aria-label="Share product"
            >
              <FiShare2 size={18} />
            </button>
            <button
              onClick={handleAddToWishlist}
              className={`p-2 rounded-full shadow-md transition-colors ${
                isWishlisted
                  ? "bg-[#d51243] text-white"
                  : "bg-white hover:bg-rose-100 hover:text-[#d51243]"
              }`}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <FiHeart size={18} />
            </button>
          </div>

          {productData.discountPercentage > 0 && (
            <div className="absolute top-4 left-4 bg-[#d51243] text-white px-3 py-1 rounded-lg font-bold">
              -{productData.discountPercentage}%
            </div>
          )}

          
        </div>

        <div className="grid grid-cols-4 gap-2">
          {productData.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentImageIndex
                  ? "border-[#d51243]"
                  : "border-transparent hover:border-gray-300"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/* Product tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {productData.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-rose-100 text-[#d51243] text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="lg:w-1/2">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {productData.title}
          </h1>
          {productData.isBestSeller && (
            <div className="flex items-center bg-rose-100 px-2 py-1 rounded">
              <FiAward className="text-[#d51243] mr-1" />
              <span className="text-sm font-medium">Best Seller</span>
            </div>
          )}
        </div>

        <div className="flex items-center flex-wrap gap-2 mb-4">
          <RatingStars rating={productData.rating} />
          <span className="text-gray-600 text-sm">
            ({productData.reviews?.length || 0} reviews)
          </span>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="text-gray-600 text-sm flex items-center">
            <FiEye className="mr-1" /> {viewsCount} views
          </span>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="text-gray-600 text-sm">SKU: {productData.sku}</span>
        </div>

        <div className="mb-6">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-2xl md:text-3xl font-bold text-[#d51243]">
              ₹{discountedPrice}
            </span>
            {productData.discountPercentage > 0 && (
              <>
                <span className="text-lg text-gray-500 line-through">
                  ₹{productData.price.toFixed(2)}
                </span>
                <span className="bg-[#d51243] text-white text-sm px-2 py-1 rounded">
                  Save {productData.discountPercentage}%
                </span>
              </>
            )}
          </div>
          {productData.discountPercentage > 10 && (
            <div className="text-sm text-green-600 mt-1 flex items-center">
              <FiTag className="mr-1" /> Extra 5% off on 2 items
            </div>
          )}
        </div>

        {/* Product Highlights */}
        {productData.features?.length > 0 && (
          <div className="mb-6 bg-rose-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Highlights:</h3>
            <ul className="space-y-2">
              {productData.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <FiCheck className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Add to Cart */}
        <div className="mb-8">
          <div className="flex items-center flex-wrap gap-4 mb-4">
            <span className="text-gray-600 font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantity("dec")}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                <FiMinus size={16} />
              </button>
              <span className="w-12 text-center border-x border-gray-300 py-1 focus:outline-none">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantity("inc")}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Increase quantity"
                disabled={quantity >= productData.stock}
              >
                <FiPlus size={16} />
              </button>
            </div>
            <span className="text-gray-600 text-sm">
              {productData.stock > 0 ? (
                <span className="text-green-600">
                  {productData.stock} items available
                </span>
              ) : (
                <span className="text-[#d51243]">Out of stock</span>
              )}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAddToCart}
              disabled={productData.stock <= 0}
              className={`flex-1 py-3 px-6 rounded-lg flex items-center justify-center font-medium transition-colors ${
                productData.stock <= 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#d51243] hover:bg-[#b3103a] text-white"
              }`}
            >
              <FiShoppingCart className="mr-2" />
              {productData.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={productData.stock <= 0}
              className={`flex-1 border rounded-lg py-3 px-6 flex items-center justify-center font-medium transition-colors ${
                productData.stock <= 0
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-[#d51243] text-[#d51243] hover:bg-rose-50"
              }`}
            >
              Buy Now
            </button>
          </div>

          <div className="mt-3 text-sm text-gray-600 flex items-center">
            <FiAlertCircle className="mr-1" /> Free shipping on orders over ₹450
          </div>
        </div>

        {/* Shipping & Policies */}
        <div className="bg-rose-50 rounded-xl p-4 mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Delivery & Returns</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <FiTruck className="text-[#d51243] mr-2 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium">Free Shipping: </span>
                <span>
                  {productData.shippingInformation ||
                    "Standard shipping within 3-5 business days"}
                  . Free delivery for orders over ₹50.
                </span>
              </div>
            </div>
            <div className="flex items-start">
              <FiShield className="text-[#d51243] mr-2 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium">Warranty: </span>
                <span>
                  {productData.warrantyInformation ||
                    "1-year manufacturer's warranty"}{" "}
                  included.
                </span>
              </div>
            </div>
            <div className="flex items-start">
              <FiRefreshCw className="text-[#d51243] mr-2 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium">Returns: </span>
                <span>
                  {productData.returnPolicy || "30-day return policy"}. No
                  questions asked return policy.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-2">Payment Methods:</h3>
          <div className="flex flex-wrap gap-2">
            <img src="/Payment-methods.png" alt="Payment-methods" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDataInfo;
