import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Container} from "react-bootstrap";
import '../cartItem/Cart.css'

const CartSingle = () => {

    let { id } = useParams()
    let url = '';
    const [ single, setSingle ] = useState()
    const [ product, setProduct ] =useState()

    const getCartDetail = async ()=> {
        url = `https://fakestoreapi.com/carts/${id}`;
        let response = await fetch(url);
        let data = await response.json()
        setSingle(data);
    }

    const handleUpdate = async () => {
        url = `https://fakestoreapi.com/carts/${id}`;
        let response = await fetch(url, {
            method: "PUT",
            body:JSON.stringify(
                {
                    userId:3,
                    date: new Date(),
                    products:[{
                        productId: single.products.productId,
                        quantity: single.products.quantity
                    }]
                }
            )
        })
    }

    useEffect(() => {
        getCartDetail();
    }, []);

    return (
        <div>
            <Container>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>주문번호</th>
                            <td colSpan="2">&nbsp;&nbsp;{single?.id}</td>
                        </tr>
                        <tr>
                            <th>상품번호</th>
                            <th>수량</th>
                            <th>-</th>
                        </tr>
                        {single && single.products.map((item, index) =>
                            <tr key={index} className="value">
                                <td className="pro_id">{item.productId}</td>
                                <td className="quantity"><input type="text" value={item.quantity} className="form-control" />개</td>
                                <td><Button variant="outline-info" type="button" onClick={handleUpdate}>수정</Button> </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Container>
        </div>
    );
};

export default CartSingle;