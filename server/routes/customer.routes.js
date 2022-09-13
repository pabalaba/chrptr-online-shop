import express from "express";
import { query, validationResult } from "express-validator";
import core from "../services/customer.services.js";

/**
 * @swagger
 *  tags:
 *      name: Customers
 *      description: List of customers
 */
const customerRouter = express.Router();

/**
 * @swagger
 *  /api/customers:
 *      get:
 *          summary: Returns all customers
 *          tags: [Customers]
 *          responses:
 *              200:
 *                  description: The list of customers
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properites:
 *                                  number:
 *                                      type: integers
 *                                  users:
 *                                      type: object
 *                                      properties:
 *                                          data:
 *                                              type: array
 *                                              items:
 *                                                  $ref: '#/models/Customer'
 */
customerRouter.get("/api/customers", async (req,res,next) => {

    if(Object.keys(req.query)!=0){
        return next();
    }

    const data = await core.getUsers();
    return res.status(200).json({
        "number": data.length,
        "users": {
            data
        }
    })
})

customerRouter.get("/api/customers",
async (req,res,next) => {
    
    if(Object.keys(req.query).length != 1 || 
       !Object.keys(req.query).includes("date")){

        return next();
    }

    await query("date").isString().run(req, { dryRun: true });

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const data = await core.getUsersByDate(req.query.date);

    return res.status(200).json({
        "number": data.length,
        "users": {
            data
        }
    });
})

customerRouter.get("/api/customers",
async (req,res,next) => {
    if(Object.keys(req.query).length != 1 || 
       !Object.keys(req.query).includes("domain")){
        return next();
    }

    await query("domain").isString().run(req, { dryRun: true });

    const errors = await validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    const data = await core.getUserByDomain(req.query.domain);

    return res.status(200).json({
        "domain": req.query.domain,
        "number": data.length
    });
})

export default customerRouter;