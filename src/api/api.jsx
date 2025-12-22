import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com/",
});


// api call for all products data
export const getAllProducts = async () => {
  try {
    const res = await api.get(
      "products?limit=0&skip=0&select=title,description,price,thumbnail,brand,rating,discountPercentage,stock,tags,category"
    );
    return res.status === 200 ? res.data : [];
  } catch (error) {
    throw new Error(error);
  }
};

// api call for single product data
export const getSingleProduct = async (id) => {
  try {
    const res = await api.get(`products/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {    
    throw new Error(error);
  }
};


// api call for products list by category
export const getCategoryProducts = async(category) => {
  try {
    const res = await api.get(`products/category/${category}`);    
    return res.status === 200 ? res.data.products : [];
  } catch (error) {
    throw new Error(error);
  }
};
