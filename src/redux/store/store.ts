import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../silce/cartSlice';
import productSlice from '../silce/productSlice';
import hasMorePrdSlice from '../silce/hasMorePrdSlice';
import compareProductSlice from '../silce/comparePrdSlice';
export const store = configureStore({
    reducer: {
        cartRedu: cartSlice,
        prdRedu: productSlice,
        hasMorePrdRed: hasMorePrdSlice,
        comparePrdRed: compareProductSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;