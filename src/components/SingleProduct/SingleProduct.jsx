import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";
import useFetch from '../../hooks/useFetch'
import { Context } from "../../utils/context";
import toast, { Toaster } from 'react-hot-toast';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPinterest,
    FaCartPlus,
} from "react-icons/fa";
import "./SingleProduct.scss";
import { useContext, useState } from "react";
const SingleProduct = () => {
    const { handleAddToCart } = useContext(Context)
    const { id } = useParams();
    const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`)
    const [quantity, setQuantity] = useState(1)

    const increment = () => {
        setQuantity((nextState) => nextState + 1)
    }
    const decrement = () => {
        setQuantity((prevState) => {
            if (prevState === 1) return 1
            return prevState - 1
        })
    }
    const notify = () => {
        toast.success('Added To Cart Successfully!');
    }


    if (!data) return

    const product = data.data[0].attributes

    return (
        <div className="single-product-main-content">
            <div className="layout">
                <div className="single-product-page">
                    <div className="left">
                        <img src={process.env.REACT_APP_DEV_URL + product.images.data[0].attributes.url} alt='' />
                    </div>
                    <div className="right">
                        <span className="name">{product.name}</span>
                        <span className="price">&#8360; {product.price}</span>
                        <span className="desc">{product.description}</span>

                        <div className="cart-buttons">
                            <div className="quantity-buttons">
                                <span onClick={decrement}>-</span>
                                <span>{quantity}</span>
                                <span onClick={increment}>+</span>
                            </div>
                            <button
                                className="add-to-cart-button"
                                onClick={() => {
                                    handleAddToCart(data?.data?.[0], quantity)
                                    setQuantity(1)
                                    notify()
                                }}
                            >
                                <Toaster
                                    position="bottom-center"
                                    reverseOrder={false}
                                />
                                <FaCartPlus size={20} />
                                ADD TO CART
                            </button>
                        </div>

                        <span className="divider" />
                        <div className="info-item">
                            <span className="text-bold">
                                Category: 
                                <span>{product.categories.data[0].attributes.title}</span>
                            </span>
                            <span className="text-bold">
                                Share:
                                <span className="social-icons">
                                    <FaFacebookF size={16} />
                                    <FaTwitter size={16} />
                                    <FaInstagram size={16} />
                                    <FaLinkedinIn size={16} />
                                    <FaPinterest size={16} />
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <RelatedProducts
                    productId={id}
                    categoryId={product.categories.data[0].id}
                />
            </div>
        </div>
    )
};

export default SingleProduct;
