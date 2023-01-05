import { createSlice, PayloadAction ,createSelector} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type CheckoutState="LOADING" | "READY"| "ERROR"
export interface CartState{
    items:{
        [ProductID:string]:number
    },
    checkoutState:CheckoutState
}


const initialState:CartState = {
    items:{},
     checkoutState:"READY"

}


const cartSlice= createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart(state,action:PayloadAction<string>){
            const id = action.payload;
            if(state.items[id]){
                state.items[id]++
            }else{
                state.items[id] =1
            }
        },
        removeFromCart(state,action:PayloadAction<string>){
            delete state.items[action.payload]
        },
        updateQuantity(state,action:PayloadAction<{id:string,quantity:number}>){
            const {id,quantity}=action.payload;
            state.items[id]=quantity;

        }
    },
    extraReducers: function (builder){
          builder.addCase("cart/checkout/pending",(state,action)=>{
            state.checkoutState="LOADING";
          })
    }
})


export const {addToCart,removeFromCart,updateQuantity}= cartSlice.actions;
export default cartSlice.reducer

export function getNumItems(state:RootState){
    let NumItems=0;
    for (let id in state.cart.items ){
        NumItems+=state.cart.items[id];
    }

    return NumItems

}

export const getMemiozedNumItems= createSelector(
    (state:RootState)=>state.cart.items,
    (items)=>{
         let numItems=0;
         for (let id in items ){
        numItems+=items[id];
    }

    return numItems

}
)

export const getTotalPrice= createSelector(
    (state:RootState)=>state.cart.items,
    (state:RootState)=>state.products.products,
    (items,products)=>{
        let total=0;
           for (let id in items ){
        total+=products[id].price * items[id];
    }
    return total.toFixed(2);



    }
)