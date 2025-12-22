import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  filterProducts: [],
  allProducts: [],
  gridView: true,
  sortingValue: 'default',
  categories: [],
  brands: [],
  filters: {
    search: '',
    category: 'all',
    max: null,
    min: null,
    priceRange: [],
    brand: '',
    rating: '',
    availability: 'Show All',
  }
};

export const filterReducer = createSlice({
  name: "filterItems",
  initialState,
  reducers: {
    loadFilterProducts: (state, action) => {
      state.filterProducts = action.payload;
      state.allProducts = action.payload
    },
    loadCategories_Brand: (state, action) => {
      let cattegories = state.allProducts.map(item => item.category)
      state.categories = ['all', ...new Set(cattegories)]
      if(state.filters.category === 'all'){
        let brands = state.allProducts.filter(item => item.hasOwnProperty('brand')).map(item => item.brand)
        state.brands = [...new Set(brands)]
        
      }else{
        let brands = state.allProducts.filter(item => item.category === state.filters.category).map(item => item.brand)
        
        state.brands = [...new Set(brands)]

      }

      if(state.filterProducts.length !== 0){
        const max = state.filterProducts.reduce((prev, crun)=> prev.price > crun.price ? prev : crun, 0)
        const min = state.filterProducts.reduce((prev, crun) => prev.price < crun.price ? prev : crun, 0)

        state.filters.max = Math.round(max.price)
        state.filters.min = Math.round(min.price)
      }
    },
    setGridView: (state, action) => {
      state.gridView = action.payload
    },
    setSortingValue: (state, action) => {
      state.sortingValue = action.payload
    },  
    sortingProducts: (state, action) => {
      if( state.sortingValue === 'price-low'){
        state.filterProducts = state.filterProducts.sort((a, b) => a.price - b.price)
      }else if(state.sortingValue === 'price-high'){
        state.filterProducts = state.filterProducts.sort((a, b) => b.price - a.price)
      }else if(state.sortingValue === 'rating'){
        state.filterProducts = state.filterProducts.sort((a, b) => b.rating - a.rating)
      }else if(state.sortingValue === 'lowest'){
        state.filterProducts = state.filterProducts.sort((a, b) => a.rating - b.rating)
      }else if(state.sortingValue === 'a-z'){
        state.filterProducts = state.filterProducts.sort((a, b) => a.title.localeCompare(b.title))
      }else if(state.sortingValue === 'z-a'){
        state.filterProducts = state.filterProducts.sort((a, b) => b.title.localeCompare(a.title))
      }
    },
    updateFilterValues: (state, action) => {      
      const {name, value} = action.payload

      if(name === 'category'){
        state.filters[name] = value; 
        state.filters.brand = ''
        state.filters.search = ''
        state.filters.rating = ''
        state.sortingValue= 'default'
        state.filters.priceRange = []
        return;
      }
      state.filters[name] = value; 
           
    },
    applyFilters: (state, action) => {
      let tempProducts = [...state.allProducts];
      
      const { search, category, brand, rating, availability, priceRange } = state.filters;
    
      // 1. Apply search filter 
      if (search) {
        tempProducts = tempProducts.filter(product => 
          product.description.toLowerCase().includes(search.toLowerCase()) ||
          product.title.toLowerCase().includes(search.toLowerCase())
        );
      }
    
      // 2. Apply category filter
      if (category !== 'all') {
        tempProducts = tempProducts.filter(product => 
          product.category === category
        );
      }
    
      // 3. Apply brand filter
      if (brand) {
        tempProducts = tempProducts.filter(product => 
          product.brand === brand
        );
      }
    
      // 4. Apply rating filter
      if (rating) {
        const ratingNum = parseInt(rating);
        tempProducts = tempProducts.filter(product => 
          product.rating >= ratingNum && product.rating < ratingNum + 1
        );
      }
    
      // 5. Apply availability filter
      if (availability === 'Out of Stock') {
        tempProducts = tempProducts.filter(product => product.stock <= 0);
      } else if (availability === 'In Stock') {
        tempProducts = tempProducts.filter(product => product.stock >= 1);
      }
    
      // 6. Apply price range filter
      if (priceRange.length === 2) {
        tempProducts = tempProducts.filter(product => 
          product.price >= priceRange[0] && product.price <= priceRange[1]
        );
      }
    
      
      state.filterProducts = tempProducts;
    },
    resetFilters: (state) => {
      state.filters = {
        search: '',
        category: 'all',
        max: null,
        min: null,
        priceRange: [],
        brand: '',
        rating: '',
        availability: 'Show All',
      };
      state.sortingValue = 'default',
      state.filterProducts = [...state.allProducts];
    },
  },
});



export const { loadFilterProducts, loadCategories_Brand, setGridView, setSortingValue, sortingProducts, updateFilterValues, applyFilters, resetFilters } = filterReducer.actions;


