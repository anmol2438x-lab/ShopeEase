import { memo } from "react";

import AddToCartPopup from "./AddToCartPopup";
import ContactSection from "./ContactSection";
import Loader from "./Loader";
import PageToHome from "./PageToHome";
import ProductCard from "./ProductCard";
import RatingStars from "./RatingStars";
import ErrorMessage from "./ErrorMessage";
import ProductNotFound from "./singleProductPageParts/ProductNotFound";
import NavPagination from "./singleProductPageParts/NavPagination";
import ProductDataInfo from "./singleProductPageParts/ProductDataInfo";
import ProductTab from "./singleProductPageParts/ProductTab";
import CouponSection from "./cartPageCompo/CouponSection";
import EmptyCart from "./cartPageCompo/EmptyCart";
import CartItemCard from "./cartPageCompo/CartItemCard";
import CartItems from "./cartPageCompo/CartItems";
import OrderSummary from "./cartPageCompo/OrderSummary";
import WishlistEmpty from "./wishlistPageCompo/WishlistEmpty";
import WishlistItemCard from "./wishlistPageCompo/WishlistItemCard";
import ProductList from "./shopPageCompo/ProductList";
import Sorting from "./shopPageCompo/Sorting";
import ProductFilter from "./shopPageCompo/FilterSection";
import NoProductsFound from "./shopPageCompo/NoProductsFound";
import ProductListCard from "./ProductListCard ";
import PriceRangeFilter from "./shopPageCompo/PriceRangeFilter";
import CheckBrand from "./shopPageCompo/CheckBrand";
import HeroSection from "./homePageCom/HeroSection";
import CatSlider from "./homePageCom/FeaturedCategories";
import CatCard from "./homePageCom/CatCard";
import ProductsSwitchTab from "./homePageCom/ProductsSwitchTab";
import FeaturedProducts from "./homePageCom/FeaturedProducts";
import PaddingSection from "./PaddingSection";
import BannerSection from "./homePageCom/BannerSection";
import ProductsWrapper from "./homePageCom/ProductsWrapper";
import Checkout from "./cartPageCompo/Checkout";
import CheckoutProductCard from "./cartPageCompo/CheckoutProductCard";
import OrderCard from "./orderPageComp/OrderCard";




// Memoize Components First
const MemoizedPageToHome = memo(PageToHome);
const MemoizedContactSection = memo(ContactSection);
const MemoizedLoader = memo(Loader);
const MemoizedProductCard = memo(ProductCard);
const MemoizedRatingStars = memo(RatingStars);
const MemoizedAddToCartPopup = memo(AddToCartPopup);
const MemoizedErrorMessage = memo(ErrorMessage);
const MemoizedProductNotFound = memo(ProductNotFound);
const MemoizedNavPagination = memo(NavPagination);
const MemoizedProductDataInfo = memo(ProductDataInfo);
const MemoizedProductTab = memo(ProductTab);
const MemoizedCouponSection = memo(CouponSection);
const MemoizedEmptyCart = memo(EmptyCart);
const MemoizedCartItemCard = memo(CartItemCard);
const MemoizedCartItems = memo(CartItems);
const MemoizedOrderSummary = memo(OrderSummary);
const MemoizedCheckout = memo(Checkout);
const MemoizedWishlistEmpty = memo(WishlistEmpty);
const MemoizedWishlistItemCard = memo(WishlistItemCard);
const MemoizedProductFilter = memo(ProductFilter);
const MemoizedProductList = memo(ProductList);
const MemoizedSorting = memo(Sorting);
const MemoizedNoProductsFound = memo(NoProductsFound);
const MemoizedProductListCard = memo(ProductListCard);
const MemoizedPriceRangeFilter = memo(PriceRangeFilter);
const MemoizedCheckBrand = memo(CheckBrand);
const MemoizedHeroSection = memo(HeroSection);
const MemoizedCatSlider = memo(CatSlider);
const MemoizedCatCard = memo(CatCard);
const MemoizedProductsSwitchTab = memo(ProductsSwitchTab);
const MemoizedFeaturedProducts = memo(FeaturedProducts);
const MemoizedPaddingSection = memo(PaddingSection);
const MemoizedBannerSection = memo(BannerSection);
const MemoizedProductsWrapper = memo(ProductsWrapper);
const MemoizedCheckoutProductCard = memo(CheckoutProductCard);
const MemoizedOrderCard = memo(OrderCard);

// Properly Export Memoized Components
export {
  MemoizedPageToHome as PageToHome,
  MemoizedContactSection as ContactSection,
  MemoizedLoader as Loader,
  MemoizedProductCard as ProductCard,
  MemoizedRatingStars as RatingStars,
  MemoizedAddToCartPopup as AddToCartPopup,
  MemoizedErrorMessage as ErrorMessage,
  MemoizedProductNotFound as ProductNotFound,
  MemoizedNavPagination as NavPagination,
  MemoizedProductDataInfo as ProductDataInfo,
  MemoizedProductTab as ProductTab,
  MemoizedCouponSection as CouponSection,
  MemoizedEmptyCart as EmptyCart,
  MemoizedCartItemCard as CartItemCard,
  MemoizedCartItems as CartItems,
  MemoizedCheckout as Checkout,
  MemoizedOrderSummary as OrderSummary,
  MemoizedWishlistEmpty as WishlistEmpty,
  MemoizedWishlistItemCard as WishlistItemCard,
  MemoizedProductFilter as ProductFilter,
  MemoizedProductList as ProductList,
  MemoizedSorting as Sorting,
  MemoizedNoProductsFound as NoProductsFound,
  MemoizedProductListCard as ProductListCard,
  MemoizedPriceRangeFilter as PriceRangeFilter,
  MemoizedCheckBrand as CheckBrand,
  MemoizedHeroSection as HeroSection,
  MemoizedCatSlider as CatSlider,
  MemoizedCatCard as CatCard,
  MemoizedProductsSwitchTab as ProductsSwitchTab,
  MemoizedFeaturedProducts as FeaturedProducts,
  MemoizedPaddingSection as PaddingSection,
  MemoizedBannerSection as BannerSection,
  MemoizedProductsWrapper as ProductsWrapper,
  MemoizedCheckoutProductCard as CheckoutProductCard,
  MemoizedOrderCard as OrderCard,
};
