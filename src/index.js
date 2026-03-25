import connectDB from "./db/index.js";
import dotenv from "dotenv"
import {app} from "./app.js"

dotenv.config({
    path: './.env'
})

console.log("MONGO_URI:", process.env.MONGO_URI);

connectDB()
.then(()=>{

    app.on("error",(error)=>{
        console.log("ERRR: ", error);
        throw error
    })

    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`Server running`)
    })
})
.catch((err)=>{
    console.log("MongoDB db connection failed !!!")
})













/*
import express from "express";

const app = express()

const connectDB = async()=>{
    try {
        await moongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERROR : ",error)
            throw err 
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on PORT ${process.env.PORT}`);
        })
    }catch(error){
        console.log("ERROR : ",error)
        throw err 
    }
} 
*/