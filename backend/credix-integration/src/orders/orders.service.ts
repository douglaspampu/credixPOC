import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from './entities/order.entity'
import {v4 as uuidv4} from 'uuid';
import { CredixInterface } from 'src/credix/credix-interface';
import { Products } from 'src/products/products';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order>{

    //get buyer's info
    const credix = new CredixInterface()

    const buyerInfo = await credix.checkBuyer('26900161000125')
    //get product data

    const productsInterface = new Products()

    const products = productsInterface.getProductByIds(createOrderDto)

    const orderData = {
      externalId:uuidv4(),
      subtotalAmountCents:products.totalPrice,
      paymentTermDays:0,
      shippingCostCents:200,
      buyerTaxId: '26900161000125', //This should be returned by a 'get user session' function
      orderDate: new Date().toISOString(),
      sellerTaxId: '37154724000108', //This must be an env variable
      orderStatus: OrderStatus.Created,
      maxPaymentTermDays: buyerInfo.sellerConfigs[0].maxPaymentTermDays,
      products:createOrderDto.toString(),
      credixOrderId:OrderStatus.Created,
    }

    //Create order on DB
    const order = this.ordersRepository.create(orderData)
    const savedOrder = await this.ordersRepository.save(order)

    return savedOrder;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async finalizeOrder(id:string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where:{
        externalId:id
      }
    })

    const credix = new CredixInterface()

    const finalizedOrder = await credix.finalizeOrder(order.credixOrderId)

    return finalizedOrder

  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {

    const order = await this.ordersRepository.findOne({
      where:{
        externalId:id
      }
    })

    if(order.maxPaymentTermDays <= updateOrderDto.paymentTermDays){
      throw new Error("Buyer don't have this amount of payment term days")
    }

    const credix = new CredixInterface()

    order.paymentTermDays = updateOrderDto.paymentTermDays

    const credixOrder = await credix.createOrder(order)

    order.orderStatus = OrderStatus.Pending
    order.credixOrderId = credixOrder.id

    const updatedOrder = await this.ordersRepository.save(order)


    return updatedOrder;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
