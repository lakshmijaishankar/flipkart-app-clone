import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductObjectKey } from './productSlice';

interface Cart {
    isOpened: boolean;
    loading: boolean,
    cartCount: number,
    cartItem: Array<ProductObjectKey>,
    error: string | any,
    totalAmount: number;
}

const cart: Cart = {
    isOpened: false,
    loading: false,
    cartCount: 0,
    cartItem: [],
    error: "",
    totalAmount: 0
}



export const cartSlice = createSlice({
    name: "cart",
    initialState: cart,
    reducers: {
        cartIsToOpen: (state) => {
            state.isOpened = !state.isOpened
        },
        addToCart: (state, action: PayloadAction<ProductObjectKey>) => {
            return {
                ...state,
                cartCount: state.cartCount + 1,
                cartItem: [...state.cartItem, { ...action.payload, itemQuantity: 1, itemPrice: action.payload.price }],
                totalAmount: state.totalAmount + action.payload.price,
            }
        },
        incrementCartItem: (state, action: PayloadAction<number>) => {
            /*  return {
                 ...state,
                 cartItem: state.cartItem.map(item => {
                     if (item.id === action.payload) {
                         return {
                             ...item,
                             itemQuantity: item.itemQuantity + 1,
                             itemPrice: item.price + item.itemPrice
                         };
                     }
                     return item;
                 })
             }; */
            state.cartItem = state.cartItem.map(item => {
                if (item.id === action.payload) {
                    state.totalAmount = state.totalAmount + item.price
                    return {
                        ...item,
                        itemQuantity: item.itemQuantity + 1,
                        itemPrice: item.price + item.itemPrice
                    };
                }
                return item;
            })
        },
        decrementCartItem: (state, action: PayloadAction<number>) => {
            state.cartItem = state.cartItem.map(item => {
                if (item.id === action.payload && item.itemQuantity > 1) {
                    state.totalAmount = state.totalAmount - item.price
                    return {
                        ...item,
                        itemQuantity: item.itemQuantity - 1,
                        itemPrice: item.itemPrice - item.price,
                    };
                }
                return item;
            })
        },
        removeCartItem: (state, action: PayloadAction<number>) => {
            state.cartItem = state.cartItem.filter(item => {
                if (item.id !== action.payload) {
                    return true;
                } else {
                    state.totalAmount = state.totalAmount - item.itemPrice
                }
            })
            state.cartCount = state.cartCount - 1;
            /* console.log(state.cartItem.filter(item => {
                if (item.id
                    !== action.payload) {
                    state.cartCount = state.cartCount - 1;
                    return true;
                }
            })) */
        }
    },

})

export default cartSlice.reducer;
export const { cartIsToOpen, addToCart, incrementCartItem, decrementCartItem, removeCartItem } = cartSlice.actions