import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import {
    CartIconContainer,
    ShoppingIcon,
    ItemCount,
} from './cart-icon.styles'

const CartIcon = () => {
    const { cartShow, setCartShow, cartCount } = useContext(CartContext)
    const toggleIsCartOpen = () => setCartShow(!cartShow)

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon
