import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        address:{
            type: String,
            required: true,
        },
        creationDate: {
            type: Date,
            required: true,
        },
        lastLogin: {
            type: Date,
            default: Date.now(),
        },
    },
    { versionKey: '_v1'}
);

const Client = mongoose.model('Client',ClientSchema);

export default Client;