import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Recipe from './recipe';

const Recipes = () => {

    const url = 'https://d9aemxxda5.execute-api.eu-central-1.amazonaws.com/'

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${url}/sandbox/getrecipes`)
            setData(response.data.recipes);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    return <div class="page_content catalog wrap">{data.map((recipe)=>{
        return <Recipe recipe={recipe}/>
    })}</div>

}

export default Recipes
