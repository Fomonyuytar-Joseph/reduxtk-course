import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../features/cart/cartSlice"
import productReducer from "../features/products/productSlice"
export const store = configureStore({
    reducer:{
        cart:CartReducer,
        products:productReducer

    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch