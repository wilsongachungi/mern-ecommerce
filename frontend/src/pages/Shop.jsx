import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useGetFile} from '../redux/api/productApiSlice'
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { setCategories, setProducts, setChecked } from "../redux/features/shop/shopSlice";
import Loader from "../components/loader";
import { useFetchCategoryQuery } from "../redux/api/categoryApiSlice";

const Shop = () =>{
    const dispatch = useDispatch()
    const {categories, products, checked, radio} = useSelector((state) => state.shop)

    const categoriesQuery = useFetchCategoryQuery()
    const [priceFilter, setPriceFilter] = useSelector('')

    const filteredProductsQuery = useGetFilteredProductsQuery({
        checked, radio
    });

    useEffect(() => {
        if(!categoriesQuery.isLoading) {
            dispatch(setCategories(categoriesQuery.data))
        }
    }, [categoriesQuery.data, dispatch])

    useEffect(() => {
        if(!checked.length || !radio.length) {
            if(!filteredProductsQuery.isLoading) {
                //Filter products based on both checked categories and price filter
                const filteredProducts = filteredProductsQuery.data.filter((product) => {
                    //check the product price includes the entered price filter value
                    return (
                        product.price.toString.includes(priceFilter) || product.price === parseInt(priceFilter, 10)
                    );
                });
                dispatch(setProducts(filteredProducts))
            }
        }
    });

    const handleBrandclick = (brand) => {
        const productsByBrand = filteredProductsQuery.data?.filter(
            (product) => product.brand === brand
        );
        dispatch(setProducts(productsByBrand))
    };

    const handleCheck = (value, id) => {
        const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id)
        dispatch(setChecked(updatedChecked))
    }

    //Add all brands option to uniqueBrands

    const uniqueBrands = [
        ...Array.from(
            new Set(filteredProductsQuery.data?.map((product) => product.brand).filter)
        )
    ]

    return (
        <div>Shop</div>
    )
}

export default Shop;