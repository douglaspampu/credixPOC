import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from './product';
import Recipe from '../receitas/recipe';

const ProductPage = () => {
    
    const [data, setData] = useState();

    const url = 'https://d9aemxxda5.execute-api.eu-central-1.amazonaws.com/'
    useEffect( () => {
        const fetchData = async () => {
            try {
                const product = await axios.get(`${url}/sandbox/getproducts?product=${window.location.pathname.split('/')[2]}`)
                console.log(product)
    
                const recipe = await axios.get(`${url}/sandbox/searchrecipes?product=${window.location.pathname.split('/')[2].toLocaleLowerCase()}`)
    
                setData([product.data.ingredients[0], recipe.data]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    },[]);

    console.log(data)

    return <div class="page_content">
            <Product props={data?data[0]:{}}/>

            <div>
                <h3>Recipe suggestions using this product</h3>
                <div class="catalog wrap">
                    {data?data[1].map((r)=>{
                        const rec = {
                            recipe:r
                        }
                        return <Recipe recipe={r} />
                    }):<></>}
                </div>
            </div>
        </div>
} 

export default ProductPage