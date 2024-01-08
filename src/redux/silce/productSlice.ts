import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

export type ProductObjectKey = {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string;
    images: string[];
    itemQuantity: number;
    itemPrice: number;
    isChecked: boolean
}

type ProductListData = {
    loading: boolean;
    prdListData: ProductObjectKey[];
    error: string | any;
    selectedCategories: string[];
    prdFilterData: ProductObjectKey[];
    prdDetails: ProductObjectKey[];
    hasMorePrdItems: ProductObjectKey[];
}

const productListData: ProductListData = {
    loading: false,
    prdListData: [],
    error: "",
    selectedCategories: [],
    prdFilterData: [],
    prdDetails: [],
    hasMorePrdItems: []


}
export const fetchProductList = createAsyncThunk("product/fetchProductList", async () => {
    return (await axios.get("https://dummyjson.com/products")).data
})

export const fetchFilterProduct = createAsyncThunk("product/filter", async (categories: string) => {
    return (await axios.get(`https://dummyjson.com/products/category/${categories}`)).data
})

export const fetchProductDetails = createAsyncThunk("product/details", async (id: string) => {
    return (await axios.get(`https://dummyjson.com/products/${id}`)).data
})

/* export const fetchMoreProducts = createAsyncThunk("product/hasmore", async (placeholder: { limit: number, skip: number }) => {
    return (await axios.get(`https://dummyjson.com/products?skip=${placeholder.skip * 10}&limit=${placeholder.limit * 10}`)).data
}) */
const productSlice = createSlice({
    name: "product",
    initialState: productListData,
    reducers: {
        setCategories: (state, action: PayloadAction<string>) => {
            state.selectedCategories.push(action.payload);
        },
        filterUncheckedCategories: (state, action: PayloadAction<string>) => {
            const filterDataTemp = state.prdFilterData.filter(product => product.category !== action.payload)
            state.prdFilterData = filterDataTemp;
        },
        removeSelectedProduct: (state) => {
            state.prdDetails = []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductList.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchProductList.fulfilled, (state, action) => {
            state.loading = false;
            state.prdListData = action.payload.products;
        });
        builder.addCase(fetchProductList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(fetchFilterProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.prdFilterData.push(...action.payload.products)
            // state.loading = false;
            // state.prdListData = action.payload.products
        })
        builder.addCase(fetchProductDetails.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.prdDetails.push(action.payload)
        })
        builder.addCase(fetchProductDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.stack
        })
        /*  builder.addCase(fetchMoreProducts.pending, state => {
             state.loading = true;
         })
         builder.addCase(fetchMoreProducts.fulfilled, (state, action) => {
             state.loading = false;
             console.log(action.payload)
             return {
                 ...state,
                 loading: false,
                 prdListData: [...state.prdListData, ...action.payload.products]
             }
             state.loading = false;
             state.prdListData.push(...action.payload.products)
         })
         builder.addCase(fetchMoreProducts.rejected, (state, action) => {
             state.loading = false;
             state.error = action.error.message
         }) */
    }
});
export default productSlice.reducer;
export const { setCategories, filterUncheckedCategories, removeSelectedProduct } = productSlice.actions;
/* {
    id: 0,
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "",
    images: []
} */