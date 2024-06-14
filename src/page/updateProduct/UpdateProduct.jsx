import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";

const UpdateProduct = () => {

    const navigate = useNavigate()

    let {id} = useParams();
    let url = '';
    const [ menu, setMenu ] = useState();
    const [product, setProduct] = useState("");
    const { register, handleSubmit, formState:{isSubmitting, errors} } = useForm();

    const handleCancle = () => {
        navigate(`/${id}`);
    }

    const getProductDetail = async () => {
        url = `https://fakestoreapi.com/products/${id}`
        let response = await fetch(url);
        let data = await response.json()
        setProduct(data);
    }

    const getCategories = async () => {
        url = 'https://fakestoreapi.com/products/categories';
        let response = await fetch(url);
        let data = await response.json();
        setMenu(data);
    }

    const onSubmit = async (data) => {
        try {
            url = `https://fakestoreapi.com/products/${id}`;
            await new Promise((r) => setTimeout(r, 1000));
            await fetch(url, {
                method: "PATCH",
                body:JSON.stringify({data})
            })
            console.log(data);
        } catch (errors) {
        }
    }

    const handleDelete = async () =>{
        try{
            url = `https://fakestoreapi.com/products/${id}`;
            await fetch(url, {
                method:"DELETE"
            });
        } catch (errors) {
        }
    }

    useEffect(() => {
        getProductDetail();
        getCategories();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">TITLE</label>
                <input id="title" value={product.title} name="title" className="form-control" {...register("title")}
                       type="text"/>
                <label htmlFor="price">PRICE</label>
                <input id="price" value={product.price} name="price" className="form-control" {...register("price")}
                       type="number"/>
                <label htmlFor="description">DESCRIPTION</label>
                <input id="description" value={product.description} name="description"
                       className="form-control" {...register("description")} type="text"/>
                <label htmlFor="image">IMAGE</label>
                <input name="image" value={product.image} className="form-control" {...register("image")} type="text"/>
                <label htmlFor="category">CATEGORY</label>
                <select name="category" className="form-control">
                    {menu?.map((category, index) =>
                        <option key={index} value={category}>{category}</option>
                    )}
                </select>
                <div className="btn_box">
                    <Button variant="outline-info" type="submit" disabled={isSubmitting}>등록</Button>
                    <Button variant="outline-danger" type="submit" onClick={handleDelete}>삭제</Button>
                    <Button variant="outline-warning" onClick={handleCancle} type="button">취소</Button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;