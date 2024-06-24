import React, {useEffect, useState} from 'react';
import './NavBar.css';
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";

const NavBar = () => {

    const [ menu, setMenu ] = useState([]);
    const navigate = useNavigate();
    const getCategories = async () => {
        let url = 'https://fakestoreapi.com/products/categories';
        let response = await fetch(url);
        let data = await response.json();
        setMenu(data);
    }

    const handleHome = () => {
        navigate('/');
    }

    useEffect(() => {
        getCategories()
    }, []);

    return (
        <>
            <Container>
            <div className="top">
                <ul className="top_item">
                    <li><a href="/login" className="link">로그인</a>&nbsp;&nbsp;&nbsp;</li>
                    <li><a href="/join" className="link">회원가입</a>&nbsp;&nbsp;&nbsp;</li>
                    <li><a href="/carts" className="link">장바구니</a></li>
                </ul>
            </div>
            <div className="brandName" onClick={handleHome}>Salted Shop</div>
            <div className="menu">
                <ul className="menu_item">
                {menu && menu.map((menu, index) =>
                    <li key={index} value={menu}>{menu}&nbsp;&nbsp;&nbsp;&nbsp;</li>
                )}
                </ul>
            </div>
            </Container>
        </>
    );
};

export default NavBar;