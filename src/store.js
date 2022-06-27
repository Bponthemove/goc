import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            console.log(action.payload)
            //see if item already exists in cart
            const itemIndex = state.cart.findIndex(item => item.productId === action.payload.productId);
            //we already have this item in the cart, so just increase quantity
            if (itemIndex >= 0) state.cart[itemIndex].quantity++;
            //item does not exist in cart so add the item with a quantity of one
            else state.cart.push({...action.payload, quantity: 1});    
            return state;                                    
        }, 
        removeProduct : (state, action) => {
            console.log(action.payload)
            //find product in cart
            const itemIndex = state.cart.findIndex(item => item.productId === action.payload);
            //item has quantity of 1 so than item can be entirely removed
            if (state.cart[itemIndex].quantity === 1) state.cart.splice(itemIndex, 1);
            //quantity more than one, so decrement quantity
            else state.cart[itemIndex].quantity--;
            return state;
        }
    }
})

const store = configureStore({
    reducer: cartSlice.reducer
});

const { addProduct, removeProduct } = cartSlice.actions;

const cartCountSelector = state => {
    //the total number of items in the cart
    return state.cart.reduce((a, c) => a + c.quantity, 0)
}

const cartValueSelector = state => {
    //the total cart value 
    return state.cart.reduce((a, c) => a + (c.quantity * c.price), 0).toFixed(2)
}

export {
    store,
    addProduct, 
    removeProduct,
    cartCountSelector,
    cartValueSelector
};