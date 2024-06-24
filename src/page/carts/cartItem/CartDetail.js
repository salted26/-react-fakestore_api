import React, {useEffect, useState} from 'react';
import './Cart.css'
import {useNavigate} from "react-router-dom";

const CartDetail = ({id, products}) => {

    const [ product, setProduct ] = useState();
    const navigate = useNavigate();

    const handleDetail = (e) => {
        navigate(`/carts/${id}`);
    }

    const getProductImage = async () => {
        let url = `https://fakestoreapi.com/products/${products.productId}`;
        let response = await fetch(url);
        let data = await response.json();
        setProduct(data);
    }

    useEffect(() => {
        getProductImage()
    }, []);

    return (
        <>
            <td><img src={product?.image} alt="product_img" className="product_img"/></td>
            <td className="product_name" onClick={handleDetail}>{product?.title}</td>
        </>
    );
};

export default CartDetail;