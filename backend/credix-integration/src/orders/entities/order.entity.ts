import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Products } from 'src/products/products';

export enum OrderStatus {
    Complete='Complete',
    Pending='Pending',
    Created='Created'
}

@Entity()
export class Order {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    externalId:string;

    @Column()
    subtotalAmountCents:number;

    @Column()
    shippingCostCents:number;

    @Column()
    buyerTaxId:string; //Ideally this would be a FK to the buyer's table

    @Column()
    paymentTermDays:number;

    @Column()
    orderDate:string;

    @Column()
    sellerTaxId:string //Ideally this would be a FK to the seller's table

    @Column()
    orderStatus:OrderStatus

    @Column()
    maxPaymentTermDays:number

    @Column()
    credixOrderId:string

    @Column()
    products:string

    constructor(partial: Partial<Order>) {
        Object.assign(this, partial);
    }

    @Exclude()
    formatCredixOrder = () => {
        const productsInterface = new Products()
        const items = productsInterface.getProductByIds(this.products.split(',')).products

        return {
            externalId:this.externalId,
            subtotalAmountCents:this.subtotalAmountCents,
            taxAmountCents:Math.floor(this.subtotalAmountCents * 0.3), // Assuming 30% total tax for the product
            shippingCostCents:this.shippingCostCents,
            buyer:{
                company:{
                    taxId:this.buyerTaxId
                }
            },
            paymentTermDays:this.paymentTermDays,
            orderDate:this.orderDate,
            seller:{
                company:{
                    taxId:this.sellerTaxId
                }
            },
            items:items,
            successUrl:"http://localhost:3000/success",
            errorUrl:"http://localhost:3000/error",
            cancelUrl:"http://localhost:3000/calcel"
        }   
    }

}
