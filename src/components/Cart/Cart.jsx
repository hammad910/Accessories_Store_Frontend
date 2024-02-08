import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import CartItem from "./CartItem/CartItem";
import { makePaymentMethod } from "../../utils/api";
import "./Cart.scss";
import { BsCartX } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { Context } from "../../utils/context";
import {loadStripe} from '@stripe/stripe-js'
const Cart = ({ setShowCart }) => {
    const navigate = useNavigate()
    const stripePromise = loadStripe(
        process.env.REACT_APP_PUBLISHABLE_KEY
    );
    const { cartSubTotal, cartItems } = useContext(Context)
    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
            const res = await makePaymentMethod.post('/api/orders', {
              products : cartItems,
            });
      
            stripe.redirectToCheckout({
              sessionId: res.data.stripeSession.id
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="cart-panel">
            <div
                className="opac-layer"
                onClick={() => setShowCart(false)}
            ></div>
            <div className="cart-content">
                <div className="cart-header">
                    <span className="heading">Shopping Cart</span>
                    <span
                        className="close-btn"
                        onClick={() => setShowCart(false)}
                    >
                        <MdClose className="close-btn" />
                        <span className="text">close</span>
                    </span>
                </div>
                {!cartItems.length && <div className="empty-cart">
                    <BsCartX />
                    <span>No products in the cart.</span>
                    <button className="return-cta" onClick={() => { navigate('/'), setShowCart(false) }}>
                        RETURN TO SHOP
                    </button>
                </div>}
                {!!cartItems.length && <>
                    <CartItem />
                    <div className="cart-footer">
                        <div className="subtotal">
                            <span className="text">Subtotal:</span>
                            <span className="text total">
                                &#8360;{cartSubTotal}
                            </span>
                        </div>
                        <div className="button">
                            <button
                                className="checkout-cta"
                                onClick={handlePayment}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    )
};

export default Cart;
