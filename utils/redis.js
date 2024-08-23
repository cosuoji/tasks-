import { createClient } from "redis";
import dotenv from "dotenv"


dotenv.config()

const client = createClient({
    //username: "default",
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-19688.c270.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 19688,
    }
});


client.on("connect", ()=>{
    console.log("Redit Client Connected")
})

client.on('error', (err) => console.log('Redis Client Error', err));


export default client
