import { useEffect, useState, useContext } from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../utils/api";
import { Context }  from "../../utils/context";
const Home = () => {

    const { categories, setCategories, products, setProducts } = useContext(Context)

    useEffect(() => {
        getCategories()
        getProducts()
    }, [])

    const getCategories = () => {
        fetchDataFromApi('/api/categories?populate=*').then((res) => {
            setCategories(res)
        })
    };
    const getProducts = () => {
        fetchDataFromApi('/api/products?populate=*').then((res) => {
            setProducts(res)
        })
    };

    return (
        <div >
            <Banner />
            <div className="layout">
                <Category categories={categories} />
                <Products products={products} HeadingText='Popular Products' />
            </div>
        </div>
    )
};

export default Home;
