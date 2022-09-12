import express from 'express';
import { param, query, validationResult } from 'express-validator';
import itemServices from '../services/item.services.js';

const itemRouter = express.Router();


itemRouter.get("/api/items", async (req,res,next) => {
    if(Object.keys(req.query).length!=0){
        return next();
    }

    const data = await itemServices.getItems();

    return res.status(200).json({
        "number": data.length,
        "data": {
            data
        }
    })
})

itemRouter.get("/api/items", async (req,res,next) => {
    if(Object.keys(req.query).length !=1 || 
    !Object.keys(req.query).includes("name")){
        return next();
    }

    await query('name').isString().run(req, { dryRun: true });

    const errors = await validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const data = await itemServices.getItemsByName(req.query.name);

    return res.status(200).json({
        "number": data.length,
        "items": {
            data
        }
    })
})

itemRouter.get("/api/items", async (req,res,next) => {
    if(Object.keys(req.query).length !=1 || 
    !Object.keys(req.query).includes("minPrice")){
        return next();
    }

    await query('minPrice').isNumeric().run(req, { dryRun: true });

    const errors = await validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const data = await itemServices.getItemsWithMinPrice(req.query.minPrice);

    return res.status(200).json({
        "number": data.length,
        "minPrice": req.query.minPrice,
        "items": {
            data
        }
    })
})

itemRouter.get("/api/items", async (req,res,next) => {
    if(Object.keys(req.query).length !=1 || 
    !Object.keys(req.query).includes("maxPrice")){
        return next();
    }

    await query('maxPrice').isNumeric().run(req, { dryRun: true });

    const errors = await validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const data = await itemServices.getItemsWithMaxPrice(req.query.maxPrice);

    return res.status(200).json({
        "number": data.length,
        "maxPrice": req.query.maxPrice,
        "items": {
            data
        }
    })
})

itemRouter.get("/api/items", async (req,res,next) => {
    if(Object.keys(req.query).length !=2 || 
    (!Object.keys(req.query).includes("minPrice") && 
    !Object.keys(req.query).includes("maxPrice"))){
        return next();
    }

    await query('minPrice').isNumeric().run(req, { dryRun: true });
    await query('maxPrice').isNumeric().run(req, { dryRun: true });

    const errors = await validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const data = await itemServices.getItemWithinRange(req.query.minPrice,req.query.maxPrice);

    return res.status(200).json({
        "number": data.length,
        "minPrice": req.query.minPrice,
        "maxPrice": req.query.maxPrice,
        "items": {
            data
        }
    })
})

itemRouter.get("/api/items", async (req,res,next) => {
    if(Object.keys(req.query).length !=1 || 
    !Object.keys(req.query).includes("quantity")){
        return next();
    }

    await query('quantity').isBoolean({strict: true}).run(req, { dryRun: true });

    const errors = await validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const b = (req.query.quantity === 'true' || req.query.quantity === '1');
    const data = await itemServices.getItemOrderWithQuantity(b);

    return res.status(200).json({
        "number": data.length,
        "ordered": b?"ASC":"DESC",
        "items": {
            data
        }
    })
})


itemRouter.get("/api/items/:uc", 
param('uc').isUUID(),
async (req,res,next) => {

    if(Object.keys(req.params).length==0){
        return next();
    }

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const data = await itemServices.getItemByUniqueCode(req.params.uc);

    return res.status(200).json({
        "single": true,
        "item": {
            data
        }
    });

})


export default itemRouter;