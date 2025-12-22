
// handle cart items local storage 
export const addItemToCartLocal = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};


export const getItemsFromCartLocal = () => {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
};



// handle whishlist local storage 
export const setWishlistItem = (wishlistItems) => {
  localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems))
}


export const getWishlistItems = () => {
  const wishlistItems = localStorage.getItem('wishlistItems')
  return wishlistItems ? JSON.parse(wishlistItems) : []
}


// handle recentlyViewed items in local storage

export const setRecentlyViewed = (recentlyViewedItems) => {
  localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewedItems))
}


export const getRecentlyViewed = () => {
  const recentlyViewedItems = localStorage.getItem('recentlyViewed');
  return recentlyViewedItems ? JSON.parse(recentlyViewedItems) : []
}

// handle appliedCoupon in local storage

export const setAppliedCouponInLocal = (coupon) => {
  localStorage.setItem('appliedCoupon', JSON.stringify(coupon))
}


export const getAppliedCoupon = () => {
  const appliedCoupon = localStorage.getItem('appliedCoupon')
  return appliedCoupon ? JSON.parse(appliedCoupon) : null
}


// handle orders

export const setOrders = (order) => {
  localStorage.setItem('orders', JSON.stringify(order))
}


export const getOrders = () => {
  const orders = localStorage.getItem('orders')
  return orders ? JSON.parse(orders) : []
}