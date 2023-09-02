import { combineReducers } from '@reduxjs/toolkit'

import { userReducer } from './user/user.slice'
import { categoriesReducer } from './categories/category.slice'
import { cartReducer } from './cart/cart.slice'

//* root reducer needs a descriptive name and
//* its reducer
export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
})
