import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import './productDetail.css'
import {Button, Col, Container, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";

const ProductDetail = () => {

    let { id } = useParams();
    let url = "";

    const [ product, setProduct ] = useState("");
    const { register, handleSubmit, formState:{isSubmitting, errors}} = useForm();
    const navigate = useNavigate();

    const getProductDetail = async ()=> {
        url = `https://fakestoreapi.com/products/${id}`
        let response = await fetch(url);
        let data = await response.json()
        setProduct(data);
    }

    const handleList = () => {
        navigate('/');
    }

    const handleUpdate = () => {
        navigate(`/product/update/${id}`)
    }

    useEffect(() => {
        getProductDetail()
    }, []);

    const onSubmit = async (data) =>{
        url = 'https://fakestoreapi.com/carts';
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(
                {
                    userId: 5,
                    date: new Date(),
                    products: [{
                        productId: id,
                        quantity: data.quantity
                    }]
                }
            )
        });
    }

    return (
        <>
            <Container>
                <Row>
                    <Col lg={6} className="info">
                        <div className='product_img'>
                            <img src={product?.image} className="pro_img" alt={product.title} />
                        </div>
                    </Col>
                    <Col lg={6} className="info">
                        <div className="product_info">
                            <div className="title">{product?.title}</div>
                            <div className="price">{product?.price}</div>
                            <div className="rating">{product.rating?.rate} / {product.rating?.count}</div>
                            <div className="description">{product?.description}</div>
                        </div>
                        <div className="cart-in">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label htmlFor="quantity">수량</label>
                                <select name="quantity" className="form-select-sm" {...register("quantity")}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <Button variant="outline-success" type="submit" disabled={isSubmitting}>장바구니</Button>
                            </form>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className="btn-box">
                            <Button variant="outline-info" type="button" onClick={handleList}>목록</Button>
                            <Button variant="outline-primary" type="button" onClick={handleUpdate}>수정</Button>
                            <Button variant="outline-danger">삭제</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ProductDetail;