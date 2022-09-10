import express from "express";
import core from "../services/client.services.js";

const clientRouter = express.Router();


clientRouter.get("/api/clients", async (req,res) => {
    const data = await core.getUsers();
    return res.status(200).json({
        "number": data.length,
        "users": {
            data
        }
    })
})


export default clientRouter;