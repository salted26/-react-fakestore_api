import React, {useEffect, useRef, useState} from 'react';
import Products from "../products/Products";
import {Button, Col, Container, Row} from "react-bootstrap";
import './Allproduct.css'
import {useNavigate, useParams} from "react-router-dom";

const AllProducts = () => {

    const navigate = useNavigate();
    const [ product, setProduct ] = useState("")
    let { category } = useParams();
    let url = "";

    let limit = useRef('');
    let sort = useRef('');


    const oriUrl = () => {
        if(!limit && !sort) {
            url = 'https://fakestoreapi.com/products';
        } else {
            url = `https://fakestoreapi.com/products?limit=${limit.current}&sort=${sort.current}`;
        }
    }

    const getAllProducts = async (limit, sort) =>{
        if(category === '' || category === undefined){
            oriUrl();
        } else {
            if(!limit && !sort){
                url = `https://fakestoreapi.com/products/category/${category}`;
            } else if(limit !== '' || sort !== '') {
                url = `https://fakestoreapi.com/products/category/${category}?limit=${limit.current}&sort=${sort.current}`;
            }
        }
        console.log(url);
        let response = await fetch(url);
        let data = await response.json();
        setProduct(data);
    }

    const handleLimit = (event) => {
        limit.current = event.target.value;
        getAllProducts(limit, sort);
    }

    const handleSort = (event) =>{
        sort.current = event.target.value;
        getAllProducts(limit, sort)
    }

    const handleAdd = () => {
        navigate('/product/add');
    }

    useEffect(() => {
        getAllProducts();
    }, [url]);

    return (
        <div>
            <Container>
                <div className="sort">
                    <select name="limit" onChange={handleLimit}>
                        <option value="">ALL</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    &nbsp;&nbsp;
                    <input type="radio" value="asc" name="sort" onClick={handleSort}/>&nbsp;오름차순&nbsp;&nbsp;
                    <input type="radio" value="desc" name="sort" onClick={handleSort}/>&nbsp;내림차순&nbsp;&nbsp;
                </div>
                <Row>
                    {product && product.map((product, index) =>
                        <Col lg={3} key={index} className="product_info">
                            <Products product={product}/>
                        </Col>
                    )}
                </Row>
                <div className="button_box">
                    <Button type="button" variant="outline-success" onClick={handleAdd}>등록</Button>
                    <Button type="button" variant="outline-dark">삭제</Button>
                </div>
            </Container>

        </div>
    );
};

export default AllProducts;