import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {Button} from "react-bootstrap";
import './AddProduct.css'
import {useNavigate} from "react-router-dom";

const AddProduct = () => {

    const [ menu, setMenu ] = useState();
    const { register, handleSubmit, formState:{isSubmitting, errors} } = useForm();

    const navigate = useNavigate()
    let url = '';

    const getCategories = async () => {
        url = 'https://fakestoreapi.com/products/categories';
        let response = await fetch(url);
        let data = await response.json();
        setMenu(data);
    }

    const handleCancle = () => {
        navigate('/');
    }

    const onSubmit = async (data) => {
        try {
            url = 'https://fakestoreapi.com/products';
            await new Promise((r) => setTimeout(r, 1000));
            let response = await fetch(url, {
                method: "POST",
                body:JSON.stringify({data})
            })
        } catch (errors) {

        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">TITLE</label>
                <input id="title" placeholder="상품명" name="title" className="form-control" {...register("title")} type="text"/>
                <label htmlFor="price">PRICE</label>
                <input id="price" placeholder="가격" name="price" className="form-control" {...register("price")} type="number"/>
                <label htmlFor="description">DESCRIPTION</label>
                <input id="description" placeholder="설명" name="description" className="form-control" {...register("description")} type="text"/>
                <label htmlFor="image">IMAGE</label>
                <input name="image" className="form-control" {...register("image")} type="text"/>
                <label htmlFor="category">CATEGORY</label>
                <select name="category" className="form-control" {...register("category")}>
                    {menu?.map((category, index) =>
                        <option key={index} value={category}>{category}</option>
                    )}
                </select>
                <div className="btn_box">
                    <Button variant="outline-info" type="submit" disabled={isSubmitting}>등록</Button>
                    <Button variant="outline-danger" onClick={handleCancle}>취소</Button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;