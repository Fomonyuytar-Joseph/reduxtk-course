import { createSlice, PayloadAction ,createSelector} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export interface CartState{
    items:{
        [ProductID:string]:number
    }
}


const initialState:CartState = {
    items:{}

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
        }
    }
})


export const {addToCart}= cartSlice.actions;
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