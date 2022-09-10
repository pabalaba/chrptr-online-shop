import express from "express";
import internal from '../services/internal.services.js';

const internalRoute = express.Router();

internalRoute.get('/api/init',async (req,res)=>{
    await internal.initClients();
    await internal.initItems();
    return res.status(201).json();
});

export default internalRoute;
