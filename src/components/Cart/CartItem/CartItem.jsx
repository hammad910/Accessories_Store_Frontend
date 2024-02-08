import React, { useContext } from "react";
import { Context } from "../../../utils/context";
import { MdClose } from "react-icons/md";
import "./CartItem.scss";
const CartItem = () => {
    const { cartItems, handleRemoveFromToCart, handleCartProductQuantity } = useContext(Context)
    return (
        <div className="cart-products">
            {cartItems.map((item) => (
                <div key={item.id} className="search-result-item">
                    <div className="image-container">
                        <img src={process.env.REACT_APP_DEV_URL + item.attributes.images.data[0].attributes.url} />
                    </div>
                    <div className="prod-details">
                        <span className="name">{item.attributes.name}</span>
                        <MdClose className="close-btn" onClick={() => handleRemoveFromToCart(item)} />
                        <div className="quantity-buttons">
                            <span onClick={() => {handleCartProductQuantity('dec', item)}}> - </span>
                            <span>{item.attributes.quantity}</span>
                            <span onClick={() => {handleCartProductQuantity('inc', item)}}> +</span>
                        </div>
                        <div className="text">
                            <span>{item.attributes.quantity}</span>
                            <span>x</span>
                            <span>
                                <span>&#8360;{item.attributes.price * item.attributes.quantity}</span>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default CartItem;
