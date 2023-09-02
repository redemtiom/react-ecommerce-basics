import { createSlice } from "@reduxjs/toolkit"


const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (item) => item.id === productToAdd.id
    )
    if (existingCartItem) {
        return cartItems.map((item) =>
            item.id === productToAdd.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(
        (item) => item.id === productToRemove.id
    )

    if (existingCartItem && productToRemove.quantity > 1) {
        return cartItems.map((item) =>
            item.id === productToRemove.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )
    }

    return deleteCartItem(cartItems, productToRemove)
}

const deleteCartItem = (cartItems, productToDelete) => {
    return cartItems.filter((item) => item.id !== productToDelete.id)
}

const INITIAL_STATE = {
    cartShow: false,
    cartItems: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
        setCartShow(state, action) {
            state.cartShow = action.payload
        },
        setCartItems(state, action) {
            state.cartItems = action.payload
        },
        addItemToCart(state, action) {
            state.cartItems = addCartItem(state.cartItems, action.payload)
        },
        removeItemFromCart(state, action) {
            state.cartItems = removeCartItem(state.cartItems, action.payload)
        },
        deleteItemFromCart(state, action) {
            state.cartItems = deleteCartItem(state.cartItems, action.payload)
        }
    },
})

export const { setCartItems, setCartShow, addItemToCart, removeItemFromCart, deleteItemFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
