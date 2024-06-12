import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import './productDetail.css'

const ProductDetail = () => {

    let { id } = useParams();
    const [ product, setProduct ] = useState("");

    const getProductDetail = async ()=> {
        let url = `https://fakestoreapi.com/products/${id}`
        let response = await fetch(url);
        let data = await response.json()
        setProduct(data);
    }

    useEffect(() => {
        getProductDetail()
    }, []);

    return (
        <div className='productDetail'>
            <img src={product?.image} className="pro_img" alt={product.title} />
            <div className="title">{product?.title}</div>
            <div className="price">{product?.price}</div>
        </div>
    );
};

export default ProductDetail;