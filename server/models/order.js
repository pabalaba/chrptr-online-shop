import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        items: [{
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
                required: true,
            },
            quantity:{
                type: Number,
                required: true,
            },
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
        },
        discountedPrice: {
            type: Number,
        },
        orderDate: {
            type: Date,
            required: true,
        },
        shippingDate: {
            type: Date,
        }
    },
    { versionKey: '_v1'}
);

const Order = mongoose.model('Order',OrderSchema);

export default Order;