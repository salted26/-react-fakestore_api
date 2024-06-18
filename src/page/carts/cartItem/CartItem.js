import React from 'react';
import './Cart.css'
import CartDetail from "./CartDetail";

const CartItem = ({ item }) => {

    return (
        <>
            {item.products && item.products.map((products, index) =>
                <tr key={index} className="cart_product">
                    <td>{item?.id}</td>
                    <td>{products.productId}</td>
                    <CartDetail id={item.id} products={products}/>
                    <td>{products.quantity} 개</td>
                    <td>{item?.date.substring(0,10)}</td>
                </tr>
            )}

        </>
    );
};

export default CartItem;