import { memo, lazy } from "react";


// code spliting for better performance
import Home from "./Home"
// const Home = lazy(() => import("./Home"))
const About = lazy(() => import("./About"))
const Cart = lazy(() => import("./Cart"))
const Contact = lazy(() => import("./Contact"))
const ErrorPage = lazy(() => import("./ErrorPage"))
const Shop = lazy(() => import("./Shop"))
const SingleProduct = lazy(() => import("./SingleProduct"))
const Wishlist = lazy(() => import("./Wishlist"))
const Orders = lazy(() => import("./Orders"))




// Wrapping components with memo
const MemoizedHome = memo(Home);
const MemoizedAbout = memo(About);
const MemoizedContact = memo(Contact);
const MemoizedShop = memo(Shop);
const MemoizedSingleProduct = memo(SingleProduct);
const MemoizedCart = memo(Cart);
const MemoizedErrorPage = memo(ErrorPage);
const MemoizedWishlist = memo(Wishlist);
const MemoizedOrders = memo(Orders);

// Exporting with the SAME Names
export {
  MemoizedHome as Home,
  MemoizedAbout as About,
  MemoizedContact as Contact,
  MemoizedShop as Shop,
  MemoizedSingleProduct as SingleProduct,
  MemoizedCart as Cart,
  MemoizedErrorPage as ErrorPage,
  MemoizedWishlist as Wishlist,
  MemoizedOrders as Orders,
};
