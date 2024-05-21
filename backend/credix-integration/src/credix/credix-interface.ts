import axios from "axios";
import { Order } from "src/orders/entities/order.entity";

export class CredixInterface {
    sellerTaxId:string;
    credixApiUrl:string;
    credixApiKey:string;
    constructor(){
        this.sellerTaxId = "37154724000108"
        this.credixApiKey = ""
        this.credixApiUrl = "https://api.pre.credix.finance/v1/"
    }

    getSellerTaxId = () => this.sellerTaxId

    checkBuyer = async (buyerTaxId:string):Promise<any> => {
        try{
            const options = {
                method:'GET',
                url:  `${this.credixApiUrl}buyers/${buyerTaxId}`,
                headers: {
                    accept: 'application/json',
                    'X-CREDIPAY-API-KEY': this.credixApiKey
                }
            }
            const buyerInfo = await axios.request(options)

            return buyerInfo.data
        } catch(error){
            console.log(error)
            throw error
        }
    }

    createOrder = async (orderData:Order):Promise<any> => {
        try {
            const options = {
                method: 'POST',
                url: `${this.credixApiUrl}orders`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'X-CREDIPAY-API-KEY': this.credixApiKey
                },
                data:orderData.formatCredixOrder()
            }

            const newOrder = await axios.request(options)

            return newOrder.data
        } catch (error){
            console.log(error)
            throw error
        }
    }

    finalizeOrder = async (orderId:string):Promise<any> => {
        try {
            const options = {
                method: 'POST',
                url: `${this.credixApiUrl}orders/${orderId}/finalize`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'X-CREDIPAY-API-KEY': this.credixApiKey
                },
            }

            const finalizedOrder = await axios.request(options)

            return finalizedOrder.data
        } catch (error){
            console.log(error)
            throw error
        }
    }
}