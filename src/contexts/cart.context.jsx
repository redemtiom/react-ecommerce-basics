import { createContext, useReducer } from 'react'

import { createAction } from '../utils/reducers/reducer.utils'

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

export const CART_ACTION_TYPES = {
    SET_CART_SHOW: 'SET_CART_SHOW',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const INITIAL_STATE = {
    cartShow: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

export const CartContext = createContext({
    cartShow: false,
    setCartShow: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    deleteItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
})

const cartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_SHOW:
            return {
                ...state,
                cartShow: payload,
            }
        case CART_ACTION_TYPES.SET_CART_ITEMS: {
            return {
                ...state,
                ...payload
            }
        }
        default:
            throw new Error(`Unhandled error type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const { cartShow, cartItems, cartCount, cartTotal } = state

    const addItemToCart = (productToAdd) =>
        updateCartItemsReducer(addCartItem(cartItems, productToAdd))

    const removeItemFromCart = (productToRemove) =>
        updateCartItemsReducer(removeCartItem(cartItems, productToRemove))

    const deleteItemFromCart = (productToDelete) =>
        updateCartItemsReducer(deleteCartItem(cartItems, productToDelete))

    const setCartShow = (value) =>
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_SHOW, value))

    const updateCartItemsReducer = (newCartItems) => {
        const updateCount = newCartItems.reduce(
            (previous, current) => previous + current.quantity,
            0
        )

        const updateTotal = newCartItems.reduce(
            (previous, current) => previous + current.quantity * current.price,
            0
        )
        const payload = {
            cartItems: newCartItems,
            cartCount: updateCount,
            cartTotal: updateTotal,
        }
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload ))
    }

    const value = {
        cartShow,
        setCartShow,
        addItemToCart,
        removeItemFromCart,
        deleteItemFromCart,
        cartItems,
        cartCount,
        cartTotal,
    }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}