import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'
import CheckOutItem from '../../components/checkout-item/checkout-item.component'

import {CheckOutContainer, Header, Block, Total} from './checkout.styles'

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext)

    return (
        <CheckOutContainer>
            <Header>
                <Block>
                    <span>Product</span>
                </Block>
                <Block>
                    <span>Description</span>
                </Block>
                <Block>
                    <span>Quantity</span>
                </Block>
                <Block>
                    <span>Price</span>
                </Block>
                <Block>
                    <span>Remove</span>
                </Block>
            </Header>
            <hr className="main-divider" />
            {cartItems.map((cartItem) => (
                <CheckOutItem product={cartItem} key={cartItem.id} />
            ))}
            <Total>Total: ${cartTotal}</Total>
        </CheckOutContainer>
    )
}

export default Checkout