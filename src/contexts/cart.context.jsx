import { createContext, useState, useEffect } from 'react'

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

export const CartProvider = ({ children }) => {
    const [cartShow, setCartShow] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const itemCounts = cartItems.reduce(
            (previous, current) => previous + current.quantity,
            0
        )

        setCartCount(itemCounts)

        const itemsTotal = cartItems.reduce(
            (previous, current) => previous + current.quantity * current.price,
            0
        )

        setCartTotal(itemsTotal)
    }, [cartItems])

    useEffect(() => {
        const itemsTotal = cartItems.reduce(
            (previous, current) => previous + current.quantity * current.price,
            0
        )

        setCartTotal(itemsTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const deleteItemFromCart = (productToDelete) => {
        setCartItems(deleteCartItem(cartItems, productToDelete))
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
