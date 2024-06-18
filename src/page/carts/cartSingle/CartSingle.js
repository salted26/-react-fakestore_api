import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Container} from "react-bootstrap";

const CartSingle = () => {

    let { id } = useParams()
    const [ single, setSingle ] = useState()

    const getCartDetail = async ()=> {
        let url = `https://fakestoreapi.com/carts/`+id;
        let response = await fetch(url);
        let data = await response.json()
        console.log(data.products);
        setSingle(data);
    }

    useEffect(() => {
        getCartDetail();
    }, []);

    return (
        <div>
            <Container>
                <table className="title">
                    <tbody>
                        <tr>
                            <th>주문번호</th>
                            <td colSpan="2">{single?.id}</td>
                        </tr>
                        {single.products && single.products.map((item, index) => {
                            <tr key={index}>
                                <td>{item.products.productId}</td>
                                <td>{item.products.quantity}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </Container>
        </div>
    );
};

export default CartSingle;