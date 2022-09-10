import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client',
            required: true,
        },
        items: [{
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
            },
            quantity: Number,
        }],
        uniqueCode: {
            type: String,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        orderDate: {
            type: Date,
            required: true,
        },
        shippingDate: {
            type: Date,
            required: true,
        }
    },
    { versionKey: '_v1'}
);

const Order = mongoose.model('Order',OrderSchema);

export default Item;