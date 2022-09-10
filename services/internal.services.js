import { faker } from "@faker-js/faker";
import Client from "../models/client.js";
import Item from "../models/item.js";
import { v4 as uuidv4 } from 'uuid';


const initClients = async () => {
    for(let i = 0;i<10;i++){
        const client = new Client({
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            email: faker.internet.email(),
            address: (faker.address.country()+", "+faker.address.state()+", "+faker.address.city()+", "+faker.address.streetAddress()),
            creationDate: Date.now()
        });
        console.log(client);
        await client.save()
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

export default{
    initClients,
    initItems
}