import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

import './checkout-item.styles.scss'

const CheckOutItem = ({ product }) => {
    const { imageUrl, name, quantity, price } = product
    const { addItemToCart, removeItemFromCart, deleteItemFromCart } =
        useContext(CartContext)

    const addProduct = () => addItemToCart(product)
    const removeProduct = () => removeItemFromCart(product)
    const deleteProduct = () => deleteItemFromCart(product)

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>

            <span className="name">{name}</span>
            <div className="quantity">
                <div onClick={removeProduct} className="arrow">
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div onClick={addProduct} className="arrow">
                    &#10095;
                </div>
            </div>
            <span className="price">{price}</span>
            <div onClick={deleteProduct} className="remove-button">
                &#10005;
            </div>
        </div>
    )
}

export default CheckOutItem
