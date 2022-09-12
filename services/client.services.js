import Client from "../models/client.js";

const getUsers = async () =>{
    return await Client.find();
}

const getUsersByDate = async (date) => {
    return await (await getUsers()).filter(x => {
        if(new Date(x.creationDate)>new Date(date))
            return x;
    });
}

const getUserByDomain = async (domain) =>{
    return await (await getUsers()).filter(x => {
        if(x.email.endsWith(domain))
            return x;
    });
}

export default{
    getUsers,
    getUsersByDate,
    getUserByDomain
}