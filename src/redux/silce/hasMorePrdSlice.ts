        import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
        import { ProductObjectKey } from './productSlice'
        import axios from 'axios'


        interface HasMorePrdState {
            loading: boolean
            hasMorePrdItems: ProductObjectKey[];
            error: string | any;
            hasMore: boolean;
            itemCount: number;
        }

        const hasMorePrdItems: HasMorePrdState = {
            loading: false,
            hasMorePrdItems: [],
            error: "",
            hasMore: true,
            itemCount: 0
        }

        export const fetchMoreProducts = createAsyncThunk("product/hasmore", async (placeholder: { limit: number, skip: number }) => {
            return (await axios.get(`https://dummyjson.com/products?skip=${placeholder.skip * 10}&limit=${placeholder.limit * 10}`)).data
        })

        const hasMoreProductSlice = createSlice({
            name: "hasmoreprd",
            initialState: hasMorePrdItems,
            reducers: {
                clearHasMoreProducts: (state) => {
                    state.hasMorePrdItems = []
                },
                compareIsChecked: (state, action: PayloadAction<number>) => {
                    if (state.itemCount < 4)
                        state.hasMorePrdItems = state.hasMorePrdItems.map(prd => {
                            if (prd.id === action.payload) {
                                state.itemCount = state.itemCount + 1
                                return {
                                    ...prd,
                                    isChecked: true
                                }
                            }
                            return prd
                        })
                },
                compareIsUnChecked: (state, action: PayloadAction<number>) => {
                    state.hasMorePrdItems = state.hasMorePrdItems.map(prd => {
                        if (prd.id === action.payload) {
                            state.itemCount = state.itemCount - 1
                            return {
                                ...prd,
                                isChecked: !prd.isChecked
                            }
                        }
                        return prd;
                    })
                },
                clearAllChecked: (state) => {
                    state.hasMorePrdItems = state.hasMorePrdItems.map(prd => {
                        if (prd.isChecked) {
                            return {
                                ...prd,
                                isChecked: false
                            }
                        }
                        return prd;
                    })
                    state.itemCount = 0;
                }
            },
            extraReducers: builder => {
            /*   builder.addCase(fetchMoreProducts.pending, state => {
                    state.loading = true;
                }) */
                builder.addCase(fetchMoreProducts.fulfilled, (state, action) => {

                    // state.loading = false;
                    let productLength = action.payload.products.length;
                    console.log(productLength)
                    if (productLength !== 0) {
                        state.hasMorePrdItems.push(...action.payload.products)

                    } else {
                        state.hasMore = !state.hasMore
                    }

                })
                builder.addCase(fetchMoreProducts.rejected, (state, action) => {

                    state.loading = false
                    state.error = action.error.message
                })
            }
        })

        export default hasMoreProductSlice.reducer;
        export const { clearHasMoreProducts, compareIsChecked, compareIsUnChecked, clearAllChecked } = hasMoreProductSlice.actions