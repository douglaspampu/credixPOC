import { useEffect, useState } from "react"
import queryString from 'query-string';
import axios from 'axios';
import './checkout.css'; // Add your custom styles

const Checkout = () => {

    const [productList, setProducts] = useState([])
    const [orderData, setOrderData] = useState({})
    const [paymentTermDays, setPaymentTermDays] = useState(7)

    useEffect(() => {
        const query = window.location.search
        const products = queryString.parse(query).products

        const itemsList = JSON.parse(`[${products}]`)

        const fetchData = async (items) => {
            const options = {
                method: 'POST',
                url: `http://localhost:3000/orders`,
                headers: {
                    'content-type': 'application/json',
                },
                data:JSON.stringify(items)
            }
            const response = await axios.request(options)

            console.log(response.data)

            setOrderData(response.data)
        }

        setProducts(itemsList)
        if(!Object.keys(orderData).length)
            fetchData(itemsList.map((item)=>item.id))
    }, [])

    const getPaymentTermDays = (maxPaymentTermDays) => {
        const options = [7]

        for(let days=10; days < maxPaymentTermDays; days += 10){
            options.push(days)
        }

        return options.map((day)=> {
            return <option value={day}>{day} days</option>
        })
    }

    const setPayloadPaymentTermDays = (element) => {
        console.log(element.target.value)
        setPaymentTermDays(element.target.value)
    }

    const completeOrder = async () => {

        console.log(paymentTermDays)

        const options = {
            method: 'PATCH',
            url: `http://localhost:3000/orders/${orderData.externalId}`,
            headers: {
                'content-type': 'application/json',
            },
            data:JSON.stringify({paymentTermDays:parseInt(paymentTermDays)})
        }
        const response = await axios.request(options)

        console.log(response.data)

        window.open(`https://app.pre.credipay.credix.finance/complete-order?id=${response.data.credixOrderId}`, '_blank')
    }

    return <>
        <h2>Checkout Page</h2>
        <div class="content">
            <div>
                <div class="order-info">
                    <label>Buyer tax id:</label>
                    <label>{orderData.buyerTaxId}</label>
                </div>
                <div class="order-info">
                    <label>Seller tax id:</label>
                    <label>{orderData.sellerTaxId}</label>
                </div>
            </div>
            <div class="item-list">
                <h4>Product Name</h4>
                <h4>Quantities</h4>
                <h4>Price</h4>
            </div>
            {productList.map((product)=>{
                return <div class="item-list">
                    <div class="item text">
                        <label>{product.name}</label>
                    </div>
                    <div class="item numeric-value">
                        <label>1</label>
                    </div>
                    <div class="item price">
                        <label>R$ {product.unit_price}</label>
                    </div>
                </div>
            })}
            <div class="total">
                <h4 style={{marginLeft:'11em'}}>Total Price</h4>
                <div class="item price" style={{marginRight:'10.5em'}}>
                    <label>R$ 
                    {
                        productList.reduce((acc, product)=>acc += product.unit_price,0)
                    }
                    </label>
                </div>
            </div>
            <div class="order-info">
                <label>Order Date</label>
                <label>{`${new Date(orderData.orderDate).toLocaleDateString('pt-BR')} ${new Date(orderData.orderDate).toLocaleTimeString('pt-BR')}`}</label>
            </div>
            <div class="order-info">
                <label>Payment term days:</label>
                <select name="paymentTermDays" value={paymentTermDays} onChange={setPayloadPaymentTermDays}>
                    {getPaymentTermDays(orderData.maxPaymentTermDays)}
                </select>
            </div>

            <div class="complete-order">
                <button onClick={completeOrder}>Complete Order</button>
            </div>
        </div>
    </>
}

export default Checkout