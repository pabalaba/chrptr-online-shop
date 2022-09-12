import Order from "../models/order.js";
import Client from "../models/client.js";
import Item from "../models/item.js";

const selectItem = '-_id -quantity -_v1';

const getOrders = async () => {
    return await Order.find().populate('client','name surname email').populate('items.item', selectItem).select('-items._id');
}

const getOrderById = async (id) => {
    return await Order.find({_id: id}).populate('client','name surname email').populate('items.item', selectItem).select('-items._id');
}

const getOrderByCustomerId = async (id) => {
    return await (await getOrders()).filter(x=>{
        if(x.client._id == id)
            return x;
    });
}

const getCustomerExpenses = async (id) => {
    return await (await getOrderByCustomerId(id))
    .reduce((prev,curr) => prev.discountedPrice + curr.discountedPrice, 0,);
}

export default{
    getOrders,
    getOrderById,
    getOrderByCustomerId,
    getCustomerExpenses,
}