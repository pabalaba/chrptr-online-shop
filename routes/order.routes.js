import express from 'express';
import { param, validationResult } from 'express-validator';
import orderServices from '../services/order.services.js';

const orderRouter = express.Router();


orderRouter.get('/api/orders', async (req,res,next) => {
    
    if(Object.keys(req.query).length!=0){
        return next();
    }

    const data = await orderServices.getOrders();

    return res.status(200).json({
        "number": data.length,
        "orders": {
            data
        }
    });
});

orderRouter.get('/api/orders/:id',
param('id').isMongoId(),
async (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const data = await orderServices.getOrderById(req.params.id);

    return res.status(200).json({
        "single": true,
        "order": {
            data
        }
    });
})

orderRouter.get('/api/orders/customer/:id', 
param('id').isMongoId(),
async (req,res,next) => {
    if(Object.keys(req.query).length!=0){
        return next();
    }

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const data = await orderServices.getOrderByCustomerId(req.params.id);

    return res.status(200).json({
        "number": data.length,
        "orders": {
            data
        }
    });
});


export default orderRouter;