import { faker } from "@faker-js/faker";
import Customer from "../models/customer.js";
import Item from "../models/item.js";
import Order from '../models/order.js';
import { v4 as uuidv4 } from 'uuid';


const initCustomers = async () => {
    for(let i = 0;i<10;i++){
        const customer = new Customer({
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            email: faker.internet.email(),
            address: (faker.address.country()+", "+faker.address.state()+", "+faker.address.city()+", "+faker.address.streetAddress()),
            creationDate: Date.now()
        });
        await customer.save()
    }
}

const initItems = async () => {
    for(let i = 0;i < 30;i++){
        const item = new Item({
            name: faker.commerce.productName(),
            quantity: parseInt(faker.random.numeric(4)),
            uniqueCode: uuidv4(),
            price: faker.commerce.price()
        })
        await item.save()
    }
}

const initOrders = async () => {
    const customerData = await Customer.find();
    const itemData = await Item.find();

    for(let j = 0; j < 500;j++){
        const order = new Order();
        order.customer = customerData[Math.floor(Math.random()*customerData.length)]._id;
        let total = 0;
        let d = Math.floor(Math.random()*25);
        for(let i = 0;i < 4;i++){
            let it = itemData[Math.floor(Math.random()*itemData.length)];
            let q = Math.floor(Math.random()*50);
            order.items.push({item: it._id, quantity: q})
            total += it.price*q;
        }
        let dp = total * (1-d/100);
        order.uniqueCode = uuidv4();
        order.totalPrice = total;
        order.discount = d;
        order.discountedPrice = dp;
        order.orderDate = Date.now();
        var date = new Date();
        date.setDate(date.getDate() + Math.floor(Math.random()*20));
        order.shippingDate = date;
        await order.save()
    }
}

export default{
    initCustomers,
    initItems,
    initOrders
}