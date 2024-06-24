import React, {useEffect, useRef, useState} from 'react';
import './Carts.css'
import CartItem from "./cartItem/CartItem";
import {Button, Container} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const Carts = () => {

    let url = '';

    const calendar = useRef(null);

    const [ carts, setCarts ] = useState();
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());

    let limit = useRef('');
    let sort = useRef('');

    const getCartProducts = async (limit, sort) =>{
        if(!limit && !sort) {
            url = 'https://fakestoreapi.com/carts';
        } else {
            url = `https://fakestoreapi.com/carts?limit=${limit.current}&sort=${sort.current}`;
        }
        let response = await fetch(url);
        let data = await response.json();
        setCarts(data);
    }

    const handleLimit = (event) => {
        getCartProducts(limit, sort);
    }

    const handleSort = (event) =>{
        sort.current = event.target.value;
        getCartProducts(limit, sort)
    }

    const onSubmit = async () =>{
        url = `https://fakestoreapi.com/carts?startdate=${startDate}&enddate=${endDate}`;
        let response = await fetch(url)
        let data = await response.json();
        console.log("data" , data);
    }

    useEffect(() => {
        getCartProducts()
    }, [url]);

    return (
        <div>
            <Container>
                <div className="list">
                    <div className="date">
                        <DatePicker dateFormat="yyyy-MM-dd" selected={startDate} onChange={date => setStartDate(date)} className="datePicker"/>
                        &nbsp;&nbsp;~&nbsp;&nbsp;
                        <DatePicker dateFormat="yyyy-MM-dd" selected={endDate} onChange={date => setEndDate(date)} className="datePicker"/>
                        <Button variant="outline-secondary" type="button" onClick={onSubmit}>검색</Button>
                    </div>
                    <div className="list_sort">
                        <select name="limit" onChange={handleLimit} className="limit">
                            <option >ALL</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                        &nbsp;&nbsp;
                        <input type="radio" value="asc" name="sort" onClick={handleSort}/>&nbsp;오름차순&nbsp;&nbsp;
                        <input type="radio" value="desc" name="sort" onClick={handleSort}/>&nbsp;내림차순&nbsp;&nbsp;
                    </div>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품번호</th>
                        <th>이미지</th>
                        <th>제품</th>
                        <th>수량</th>
                        <th>구매일자</th>
                    </tr>
                    </thead>
                    <tbody>
                    {carts && carts.map((item, index) =>
                        <CartItem item={item} key={index}/>
                    )}
                    </tbody>
                </table>
            </Container>
        </div>
    );
};

export default Carts;