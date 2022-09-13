import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        uniqueCode: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { versionKey: '_v1'}
);

const Item = mongoose.model('Item',ItemSchema);

export default Item;