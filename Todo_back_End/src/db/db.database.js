import mongoose from "mongoose"
import { DATABASE_NAME } from "../constants.js"

export const connectDb= async()=>{
    try {
        const MongooseConnection=await  mongoose.connect(`${process.env.MONGODB_URL}/${DATABASE_NAME}`)
        console.log(`Mongo Db Connected Successfully: `,MongooseConnection.connection.host)
    } catch (error) {
        console.log('Mongo Db Connection Failed..: ',error)
    }
}

