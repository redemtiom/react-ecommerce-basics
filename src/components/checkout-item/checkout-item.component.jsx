import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

import {
    CheckoutItemContainer,
    ImageContainer,
    Span,
    Quantity,
    Arrow,
    Value,
    RemoveButton
} from './checkout-item.styles'

const CheckOutItem = ({ product }) => {
    const { imageUrl, name, quantity, price } = product
    const { addItemToCart, removeItemFromCart, deleteItemFromCart } =
        useContext(CartContext)

    const addProduct = () => addItemToCart(product)
    const removeProduct = () => removeItemFromCart(product)
    const deleteProduct = () => deleteItemFromCart(product)

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
            <RemoveButton onClick={deleteProduct}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckOutItem
