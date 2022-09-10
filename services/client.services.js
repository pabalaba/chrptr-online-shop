import Client from "../models/client.js";

const getUsers = async () =>{
    return await Client.find();
}

export default{
    getUsers
}