import { useSelector } from 'react-redux'

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector'

import CheckOutItem from '../../components/checkout-item/checkout-item.component'
import PaymentForm from '../../components/payment-form/payment-form.component'

import {CheckOutContainer, Header, Block, Total} from './checkout.styles'

const Checkout = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)
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
            <PaymentForm />
        </CheckOutContainer>
    )
}

export default Checkout