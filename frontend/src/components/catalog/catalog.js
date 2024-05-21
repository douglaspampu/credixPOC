import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"; 
import {products} from "./catalogData"

const Catalog = () => {
    const url = 'https://d9aemxxda5.execute-api.eu-central-1.amazonaws.com/'

    const [data, setData] = useState([])

    const [cart, setCart] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    const addToCart = (item) => {
        setCart([...cart, item.target.value])
        console.log(cart)
    }

    const fetchData = async () => {
        try {
            //const response = await axios.get(`${url}/sandbox/getproducts`)
            setData(products);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return <div class="page_content">
        <h1>Sandbox Market</h1>
        <h2>Our Catalog</h2>
        <div>
            <Link to={`/checkout?products=${cart.toString()}`}>Go to checkout</Link>
        </div>
        <div class="catalog wrap">{data.map((element)=>{
            const elementReference = {
                id:element.id,
                name:element.name,
                unit_price:element.unit_price
            }
            return <div class="product">
                <Link to={`/catalog/${element.name}`}>{element.name}</Link>
                <div>
                    <p>{element.price}</p>
                    {element.discount?<p>Offers today</p>:<></>}
                </div>
                <img height="150px" width="150px" src={element.image_url} />
                <button onClick={addToCart} value={JSON.stringify(elementReference)}>Add to cart</button>
            </div>
        })}</div>

    </div>
} 

export default Catalog