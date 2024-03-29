import { createContext, useEffect, useState } from "react"
import { useLocation } from 'react-router-dom'

export const Context = createContext()

const AppRouter = ({ children }) => {
    const [categories, setCategories] = useState()
    const [products, setProducts] = useState()
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartSubTotal, setCartSubTotal] = useState()

    const handleAddToCart = (product, quantity) => {
        let items = [...cartItems];
        let index = items.findIndex((p) => p.id === product.id); 
        if (index !== -1) {
            items[index].attributes.quantity += quantity
        }else{
            product.attributes.quantity = quantity
            items= [...items, product]
        }
        setCartItems(items)
    }

    const handleRemoveFromToCart = (product) => {
        let items = [...cartItems];
        items = items.filter((p) => p.id !== product.id)
        setCartItems(items)
    }
    
    const handleCartProductQuantity = (type, product) => {
        let items = [...cartItems];
        let index = items.findIndex((p) => p.id === product.id); 
        if (type === 'inc') {
            items[index].attributes.quantity += 1
        } else if (type === 'dec'){
            if (items[index].attributes.quantity === 1) return
             items[index].attributes.quantity -= 1
            }
            setCartItems(items)
    }

    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    useEffect(() => {
        let subTotal = 0
        cartItems.map((item) => (
            subTotal += item.attributes.price * item.attributes.quantity
        ))
        setCartSubTotal(subTotal)

        let count = 0
        cartItems.map((item) => (
            count += item.attributes.quantity
        ))
        setCartCount(count)
    }, [cartItems])

    return (
        <Context.Provider value={{
            categories,
            setCategories,
            products,
            setProducts,
            cartItems,
            setCartItems,
            setCartCount,
            cartCount,
            cartSubTotal,
            setCartSubTotal,
            handleAddToCart,
            handleRemoveFromToCart,
            handleCartProductQuantity,
        }}>
            {children}
        </Context.Provider>
    )
}

export default AppRouter

