/* eslint-disable react/prop-types */
// ProductSlider.js
import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';

const ProductSlider = ({ products }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    const handleAddtoCart = (product) => {
        const isProductInCart = cart.find((item) => item.id === product.id);
        if (isProductInCart) {
            return alert("Product already in cart");
        }
        dispatch({ type: 'ADD_TO_CART', payload: product });
        alert("Product added to cart")
    }

    return (
        <>
            <h1 className="text-3xl font-semibold ml-4">Products</h1>
            <Slider {...settings}>
                {products.map((product) => (
                    <div key={product.id} className="p-4">
                        <div className="bg-white p-4 shadow-md rounded-md">
                            <h2 className="text-lg font-bold">{product.name}</h2>
                            <p className="text-gray-500">{product.description}</p>
                            <div className="mt-4 flex flex-col">
                                <div className="mb-2">
                                    <span className="text-lg font-bold">${product.price}</span>
                                    {product.discount && (
                                        <span className="ml-2 text-sm text-gray-500 line-through">${product.discount}</span>
                                    )}
                                </div>
                                <button onClick={() => handleAddtoCart(product)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </>
    );
};

export default ProductSlider;
