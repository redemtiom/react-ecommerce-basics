import { useSelector, useDispatch } from 'react-redux'

import { selectCartCount, selectCartShow } from '../../store/cart/cart.selector'
import { setCartShow } from '../../store/cart/cart.action'

import {
    CartIconContainer,
    ShoppingIcon,
    ItemCount,
} from './cart-icon.styles'

const CartIcon = () => {
    const dispatch = useDispatch()

    const cartCount = useSelector(selectCartCount)
    const cartShow = useSelector(selectCartShow)

    const toggleIsCartOpen = () => dispatch(setCartShow(!cartShow))

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon
