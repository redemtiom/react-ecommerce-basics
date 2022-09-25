import { createAction } from "../../utils/reducers/reducer.utils"
import { CART_ACTION_TYPES } from "./cart.types"

export const setCartItems = (cartItems) => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)

export const setCartShow = (boolean) => createAction(CART_ACTION_TYPES.SET_CART_SHOW, boolean)

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

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}
export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const deleteItemFromCart = (cartItems, productToDelete) => {
    const newCartItems = deleteCartItem(cartItems, productToDelete)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}