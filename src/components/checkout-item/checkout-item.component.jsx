import { useDispatch, useSelector } from 'react-redux'

import { selectCartItems } from '../../store/cart/cart.selector'
import {
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
} from '../../store/cart/cart.action'

import {
    CheckoutItemContainer,
    ImageContainer,
    Span,
    Quantity,
    Arrow,
    Value,
    RemoveButton,
} from './checkout-item.styles'

const CheckOutItem = ({ product }) => {
    const { imageUrl, name, quantity, price } = product

    const dispatch = useDispatch()

    const cartItems = useSelector(selectCartItems)

    const addProduct = () => dispatch(addItemToCart(cartItems, product))
    const removeProduct = () => dispatch(removeItemFromCart(cartItems, product))
    const deleteProduct = () => dispatch(deleteItemFromCart(cartItems, product))

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>

            <Span>{name}</Span>
            <Quantity>
                <Arrow onClick={removeProduct}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addProduct}>&#10095;</Arrow>
            </Quantity>
            <Span>{price}</Span>
            <RemoveButton onClick={deleteProduct}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckOutItem
