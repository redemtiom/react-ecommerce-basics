import { createSelector } from 'reselect'

export const selectCartReducer = (state) => state.cart

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

export const selectCartShow = createSelector(
    [selectCartReducer],
    (cart) => cart.cartShow
)

export const selectCartCount = createSelector(
    [selectCartItems],
    ( cartItems ) =>
        cartItems.reduce((previous, current) => previous + current.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    ( cartItems ) =>
        cartItems.reduce(
            (previous, current) => previous + current.quantity * current.price,
            0
        )
)