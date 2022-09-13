import Order from "../models/order.js";
import Customer from "../models/customer.js";
import Item from "../models/item.js";
import { v4 as uuidv4 } from 'uuid';

const selectItem = '-_id -quantity -_v1';

const getOrders = async () => {
    return await Order.find().populate('customer','name surname email').populate('items.item', selectItem).select('-items._id');
}

const getOrderById = async (id) => {
    return await Order.find({_id: id}).populate('customer','name surname email').populate('items.item', selectItem).select('-items._id');
}

const getOrderByCustomerId = async (id) => {
    return await (await getOrders()).filter(x=>{
        if(x.customer._id == id)
            return x;
    });
}

const getCustomerExpenses = async (id) => {
    return await (await getOrders()).map(x => x.discountedPrice).reduce((prev,curr) => prev + curr,0);
}

const createOrder = async (orderReq) => {
    const promos = {
        'lavida':3,
        'papaya':15
    };
    try{
        const order = new Order();
        const customerId = await Customer.findOne({email: orderReq.email});
        console.log(1);
        order.customer = customerId._id;
        const itemsReq = orderReq.items;
        let cost = 0;
        for(const item of itemsReq){
            const itemRet = await Item.findOne({uniqueCode:item.item});
            order.items.push({item: itemRet._id, quantity: item.quantity});
            cost += itemRet.price*item.quantity;
            await Item.findOneAndUpdate({_id:itemRet._id},{quantity: itemRet.quantity-item.quantity});
        }
        const discount = Object.keys(promos).includes(orderReq.promocode)?promos[orderReq.promocode]:0;
        order.uniqueCode = uuidv4()
        order.totalPrice = cost;
        order.discount = discount;
        order.discountedPrice = discount==0?cost:cost * (1-(discount/100));
        const date = new Date();
        order.orderDate = Date.now();
        date.setDate(date.getDate()+7);
        order.shippingDate=date;
        await order.save();
        return true;
    }catch(err){
        return false;
    }

}

export default{
    getOrders,
    getOrderById,
    getOrderByCustomerId,
    getCustomerExpenses,
    createOrder
}