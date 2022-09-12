import Item from "../models/item.js";

const getItems = async () => {
    return await Item.find().select("-_v1 -_id");;
}

const getItemByUniqueCode = async (uuid) => {
    return await Item.find({uniqueCode: uuid}).select("-_v1 -_id");
}

const getItemsByName = async (name) =>{
    return await (await getItems()).filter(x => {
        if(x.name.toLowerCase().includes(name.toLowerCase()))
            return x;
    })
}

const getItemsWithMinPrice = async (minPrice) => {
    return await (await getItems()).filter(x=>{
        if(x.price>=minPrice)
            return x;
    })
}

const getItemsWithMaxPrice = async (maxPrice) => {
    return await (await getItems()).filter(x=>{
        if(x.price<=maxPrice)
            return x;
    })
}

const getItemWithinRange = async (minPrice,maxPrice) => {
    return await (await getItemsWithMinPrice(minPrice)).filter(x=>{
        if(x.price<=maxPrice)
            return x;
    })
}

const getItemOrderWithQuantity = async (quantity) => {
    return await (await getItems()).sort((a,b) => quantity?a.quantity-b.quantity:b.quantity-a.quantity);
}

export default{
    getItems,
    getItemByUniqueCode,
    getItemsByName,
    getItemsWithMinPrice,
    getItemsWithMaxPrice,
    getItemWithinRange,
    getItemOrderWithQuantity
}