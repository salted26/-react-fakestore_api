import React, {useEffect, useState} from 'react';
import './NavBar.css';

const NavBar = () => {

    const [ menu, setMenu ] = useState([]);
    const getCategories = async () => {
        let url = 'https://fakestoreapi.com/products/categories';
        let response = await fetch(url);
        let data = await response.json();
        setMenu(data);
    }

    useEffect(() => {
        getCategories()
    }, []);

    return (
        <>
            <div className="brandName">Salted Shop</div>
            <div className="top_menu">
                <ul className="menu_item">
                {menu && menu.map((menu, index) =>
                    <li key={index} value={menu}>{menu}&nbsp;&nbsp;&nbsp;&nbsp;</li>
                )}
                </ul>
            </div>
        </>
    );
};

export default NavBar;