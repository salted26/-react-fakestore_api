import React from 'react';
import './Products.css'
import {useNavigate} from "react-router-dom";

const Products = ({product}) => {

    const navigate = useNavigate();

    const showDetail = () =>{
        navigate(`/${product.id}`);
    }

    return (
        <div className="product" onClick={showDetail}>
            <img src={product.image} alt={product.title} className="all_img"/>
            <div>{product.title.substring(0, 40)}</div>
            <div>$ {product.price}</div>
            <div>{product.rating.rate} / {product.rating.count}</div>
        </div>
    );
};

export default Products;