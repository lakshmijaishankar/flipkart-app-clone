import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductObjectKey } from "./productSlice";
import { toast } from "react-toastify";



type CompareProductState = {
    itemCount: number;
    compareProductItem: ProductObjectKey[]
}

const compareProductInitialState: CompareProductState = {
    itemCount: 0,
    compareProductItem: []
}

const compareProductSlice = createSlice({
    name: "compareProduct",
    initialState: compareProductInitialState,
    reducers: {
        addCompareProduct: (state, action: PayloadAction<ProductObjectKey>) => {
            if (state.itemCount < 4) {
                state.compareProductItem.push(action.payload)
                state.itemCount = state.itemCount + 1
            }
            else {
                toast.error(`
                You have already selected ${state.itemCount} products`)
            }
        },
        removeCompareProduct: (state, action: PayloadAction<{ id: number }>) => {
            const { id } = action.payload
            state.compareProductItem = state.compareProductItem.filter(prd => {
                if (prd.id !== id) {
                    return true
                } else {
                    state.itemCount = state.itemCount - 1

                }
            })
        },
        clearCompareProduct: (state) => {
            state.compareProductItem = [];
            state.itemCount = 0
        }
    }
})

export default compareProductSlice.reducer;
export const { addCompareProduct, removeCompareProduct, clearCompareProduct } = compareProductSlice.actions